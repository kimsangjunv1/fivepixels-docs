import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

// Run the actual wrappers with mocked HTTP/browser boundaries; no network requests.
const browser = new EventTarget();
const events = [];
for (const name of ["api:loading", "api:auth-expired", "api:error"]) {
    browser.addEventListener(name, (event) => events.push({ type: event.type, detail: event.detail }));
}
let fetchImpl;
const context = vm.createContext({
    window: browser, CustomEvent, Request, URL,
    fetch: (...args) => fetchImpl(...args),
});
const modules = new Map();
function load(filename) {
    const file = path.resolve("src/shared/lib/api", filename);
    if (modules.has(file)) return modules.get(file).exports;
    const compiledModule = { exports: {} };
    modules.set(file, compiledModule);
    const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const execute = vm.runInContext(`(function (require, module, exports) { ${compiled}\n})`, context);
    execute((specifier) => specifier === "server-only" ? {} : load(specifier + ".ts"), compiledModule, compiledModule.exports);
    return compiledModule.exports;
}

const { serverFetch } = load("server.ts");
const { clientFetch } = load("client.ts");
const url = "https://api.example.test/resource";

fetchImpl = async () => Response.json({ ok: true });
assert.equal((await serverFetch(url)).ok, true);

fetchImpl = async () => new Response(null, { status: 204 });
assert.equal(await serverFetch(url, { method: "DELETE" }), undefined);

fetchImpl = async () => new Response("plain text");
assert.equal(await serverFetch(url), "plain text");

fetchImpl = async () => new Response("not JSON", { headers: { "Content-Type": "application/json" } });
await assert.rejects(serverFetch(url), { name: "ApiError", message: "Invalid JSON response" });

fetchImpl = async () => Response.json({ message: "Unavailable" }, { status: 503 });
await assert.rejects(serverFetch(url), { name: "ApiError", status: 503, message: "Unavailable" });

for (const status of [401, 419]) {
    events.length = 0;
    fetchImpl = async () => new Response(null, { status });
    await assert.rejects(clientFetch(url), { status });
    assert.deepEqual(events.map((event) => event.type), ["api:auth-expired", "api:error"]);
    assert.equal(events[0].detail.status, status);
}

events.length = 0;
const pending = [];
fetchImpl = () => new Promise((resolve) => pending.push(resolve));
const first = clientFetch(url, { method: "POST" });
const second = clientFetch(new Request(url, { method: "PATCH" }));
pending[0](Response.json({ ok: true }));
await first;
pending[1](Response.json({ ok: true }));
await second;
assert.deepEqual(events.map((event) => event.detail.pending), [1, 2, 1, 0]);

events.length = 0;
fetchImpl = async () => { throw new TypeError("Network unavailable"); };
await assert.rejects(clientFetch(url, { method: "PUT" }), { message: "Network unavailable" });
assert.deepEqual(events.map((event) => event.type), ["api:loading", "api:error", "api:loading"]);
assert.equal(events.at(-1).detail.pending, 0);

events.length = 0;
fetchImpl = async () => Response.json({ ok: true });
await clientFetch(url);
assert.equal(events.length, 0);
console.log("API checks passed: JSON/text/empty parsing, HTTP/parse/network errors, 401/419 events, concurrent mutation loading, GET behavior.");
