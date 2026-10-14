import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const sourceRoot = path.resolve(process.argv[2] ?? "src");
const layers = ["app", "views", "widgets", "features", "entities", "shared"];
const errors = [];
const routes = [];
const files = fs.readdirSync(sourceRoot, { recursive: true }).filter((file) => /\.(ts|tsx)$/.test(file));
const sourceFiles = new Map(files.map((file) => [file, ts.createSourceFile(file, fs.readFileSync(path.join(sourceRoot, file), "utf8"), ts.ScriptTarget.Latest, true)]));
const check = (condition, message) => { if (!condition) errors.push(message); };

function localTarget(file, specifier) {
    const target = specifier.startsWith("@/") ? specifier.slice(2) : specifier.startsWith(".") ? path.join(path.dirname(file), specifier) : null;
    if (target === null) return null;
    const candidates = [target, ...[".ts", ".tsx", ".json", "/index.ts", "/index.tsx"].map((suffix) => target + suffix)];
    const resolved = candidates.find((candidate) => fs.existsSync(path.join(sourceRoot, candidate)) && fs.statSync(path.join(sourceRoot, candidate)).isFile());
    check(Boolean(resolved), `${file}: unresolved local import ${specifier}`);
    return resolved ?? target;
}

function widgetRoute(file) {
    let current = path.dirname(file);
    while (current.startsWith("widgets/") && current !== "widgets/layout") {
        if (sourceFiles.has(path.join(current, "Panel.tsx"))) return current;
        current = path.dirname(current);
    }
    return null;
}

for (const [file, source] of sourceFiles) {
    const visit = (node) => {
        const specifier = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) ? node.moduleSpecifier :
            ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword ? node.arguments[0] : undefined;
        if (specifier && ts.isStringLiteral(specifier)) {
            const target = localTarget(file, specifier.text);
            if (target) {
                const from = layers.indexOf(file.split(path.sep)[0]);
                const to = layers.indexOf(target.split(path.sep)[0]);
                check(from >= 0 && to >= from, `${file}: invalid layer dependency → ${target}`);
                if (file.startsWith("views/")) check(target.startsWith("widgets/") || target.startsWith("shared/"), `${file}: View must only adapt a Panel`);
                if (file.startsWith("widgets/") && target.startsWith("widgets/") && !target.startsWith("widgets/layout/")) {
                    check(widgetRoute(file) === widgetRoute(target), `${file}: cross-route widget import → ${target}`);
                }
            }
        }
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "fetch") {
            check(file.startsWith("shared/lib/api/"), `${file}: fetch must use the shared API layer`);
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
    if (/\.(api|query|type)\.ts$/.test(file)) check(file.startsWith("entities/"), `${file}: domain API/query/type must live in entities`);
}

for (const [file, page] of sourceFiles) {
    if (!file.startsWith("app/") || !file.endsWith("/page.tsx")) continue;
    const segments = path.dirname(file).split(path.sep).slice(1).filter((part) => !part.startsWith("("));
    const route = "/" + segments.join("/");
    check(file.startsWith("app/(site)/"), `${file}: public pages must live in (site)`);
    check(!page.statements.some((node) => ts.isExpressionStatement(node) && node.expression.text === "use client"), `${file}: page must be a server component`);
    const imports = page.statements.filter(ts.isImportDeclaration).map((node) => node.moduleSpecifier.text);
    const hasJsx = (node) => ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node) || ts.forEachChild(node, hasJsx);
    const isRedirect = imports.includes("next/navigation") && !hasJsx(page) && page.text.includes("redirect(");
    if (isRedirect) { routes.push({ route, kind: "redirect" }); continue; }

    const slice = segments.join("/") || "home";
    const viewDir = `views/${slice}/`;
    const viewImports = imports.filter((specifier) => specifier.startsWith("@/views/"));
    check(viewImports.length === 1 && viewImports[0].startsWith(`@/${viewDir}`) && viewImports[0].endsWith("View"), `${file}: missing matching route View`);
    check(!imports.some((specifier) => specifier.startsWith("@/features/") || specifier.startsWith("@/widgets/") && specifier !== "@/widgets/layout/Main"), `${file}: UI assembly belongs in Panel`);
    const view = viewImports[0] ? sourceFiles.get(viewImports[0].slice(2) + ".tsx") : undefined;
    check(Boolean(view?.text.includes(`from "@/widgets/${slice}"`)), `${file}: View must render matching Panel`);

    const panelPath = `widgets/${slice}/Panel.tsx`;
    const panel = sourceFiles.get(panelPath);
    check(Boolean(panel), `${file}: missing ${panelPath}`);
    if (!panel) continue;
    check(panel.statements[0]?.expression?.text === "use client", `${panelPath}: missing use client`);
    check(panel.text.includes(`import * as Layer from "@/widgets/${slice}/ui"`), `${panelPath}: import sections through Layer`);
    const sections = [];
    const visit = (node) => {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
            const tag = node.tagName.getText(panel);
            if (tag.startsWith("Layer.")) sections.push(tag.slice(6));
        }
        ts.forEachChild(node, visit);
    };
    visit(panel);
    check(sections.includes("Modal"), `${panelPath}: missing Layer.Modal`);
    check(sections.some((name) => name !== "Modal"), `${panelPath}: missing content sections`);
    check(!sections.some((name) => /Page$|Sections$/.test(name)), `${panelPath}: Panel must assemble sections directly`);
    for (const required of ["index.ts", "ui/index.ts", "ui/Modal.tsx", "modal/TestModal.tsx", "model/useConfirmModalStore.ts"]) {
        check(sourceFiles.has(`widgets/${slice}/${required}`), `${panelPath}: missing scaffold ${required}`);
    }
    check(files.some((name) => name.startsWith(`widgets/${slice}/model/`) && /\/use\w*Search\.ts$/.test(name)), `${panelPath}: missing search hook scaffold`);
    routes.push({ route, kind: "page", sections: sections.filter((name) => name !== "Modal").length });
}

for (const required of ["shared/lib/api/server.ts", "shared/lib/api/client.ts"]) check(sourceFiles.has(required), `Missing ${required}`);
if (errors.length) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
} else {
    console.log(`Checked ${sourceFiles.size} source files: ${routes.filter((route) => route.kind === "page").length} page routes, ${routes.filter((route) => route.kind === "redirect").length} redirects; no structure violations.`);
    console.table(routes);
}
