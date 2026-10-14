"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import { Highlight, type PrismTheme } from "prism-react-renderer";
import { useMessages } from "@/shared/i18n/useMessages";
import { GUIDE_SNIPPETS, type GuideSnippetKey } from "@/shared/i18n/guide/snippets";
import { cn } from "@/shared/lib/utils";

// React owns the token DOM; Prism's automatic scan can mutate it before hydration.
Prism.manual = true;

const TAILWIND_CODE_THEME: PrismTheme = {
    plain: { color: "#cbd5e1" },
    styles: [
        { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#94a3b8" } },
        { types: ["punctuation"], style: { color: "#94a3b8" } },
        { types: ["tag", "deleted", "selector", "builtin"], style: { color: "#f472b6" } },
        { types: ["property", "constant", "symbol", "boolean", "number"], style: { color: "#60a5fa" } },
        { types: ["attr-name", "string", "char", "inserted"], style: { color: "#ff6036" } },
        { types: ["operator", "entity", "url", "variable"], style: { color: "#f472b6" } },
        { types: ["atrule", "attr-value", "keyword"], style: { color: "#a78bfa" } },
        { types: ["function", "class-name"], style: { color: "#ff6036" } },
        { types: ["function"], languages: ["bash"], style: { color: "#f472b6" } },
        { types: ["regex", "important"], style: { color: "#fde68a" } },
    ],
};

const CODE_TEXT_STYLE = { fontSize: "14px", lineHeight: 1.5 } as const;

function normalizeLanguage(language: string) {
    if (["sh", "shell", "terminal"].includes(language)) return "bash";
    if (["plain", "plaintext", "txt"].includes(language)) return "text";
    return language;
}

export function CodeBlock({ snippet, code: codeProp, language = "tsx" }: { snippet?: GuideSnippetKey; code?: string; language?: string }) {
    const guide = useMessages().guides;
    const code = codeProp ?? (snippet ? GUIDE_SNIPPETS[snippet] : "");
    const highlightedLanguage = normalizeLanguage(language);
    const [copied, setCopied] = useState(false);
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
            resetTimerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }, [code]);

    return (
        <div className="group relative overflow-hidden rounded-[1.2rem] bg-[#1e1e1e] p-[0.4rem]">
            <div className="flex items-center justify-between px-[1.2rem] py-[0.9rem]">
                <span className="text-[1.1rem] uppercase tracking-wide text-[#94a3b8]">{language}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? guide.codeCopied : guide.codeCopy}
                    className={cn("inline-flex items-center gap-[0.6rem] text-[1.1rem] transition-colors", copied ? "text-[#ff6036]" : "text-[#94a3b8] hover:text-white")}
                >
                    {copied ? (
                        <>
                            <Check
                                className="size-[1.4rem]"
                                aria-hidden
                            />
                            {guide.codeCopied}
                        </>
                    ) : (
                        <>
                            <Copy
                                className="size-[1.4rem]"
                                aria-hidden
                            />
                            {guide.codeCopy}
                        </>
                    )}
                </button>
            </div>
            <Highlight
                prism={Prism}
                theme={TAILWIND_CODE_THEME}
                code={code.trimEnd()}
                language={highlightedLanguage}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cn(
                            className,
                            "overflow-x-auto rounded-[0.8rem] border border-white/10 bg-[#4c4c4c0a] p-[1.6rem] font-mono shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] tablet:p-[2.4rem]",
                        )}
                        style={{ ...style, backgroundColor: "#4c4c4c0a" }}
                    >
                        <code style={CODE_TEXT_STYLE}>
                            {tokens.map((line, lineIndex) => (
                                <span
                                    key={lineIndex}
                                    {...getLineProps({ line })}
                                    className="block min-w-max"
                                    style={CODE_TEXT_STYLE}
                                >
                                    {line.map((token, tokenIndex) => {
                                        const tokenProps = getTokenProps({ token });
                                        const isBashArgument = highlightedLanguage === "bash" && token.types.includes("plain") && token.content.trim();

                                        return (
                                            <span
                                                key={tokenIndex}
                                                {...tokenProps}
                                                style={{
                                                    ...tokenProps.style,
                                                    ...(isBashArgument ? { color: "#ff6036" } : {}),
                                                    ...CODE_TEXT_STYLE,
                                                }}
                                            />
                                        );
                                    })}
                                </span>
                            ))}
                        </code>
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
