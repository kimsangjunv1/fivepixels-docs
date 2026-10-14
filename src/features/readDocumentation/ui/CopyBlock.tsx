"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useMessages } from "@/shared/i18n/useMessages";

export function CopyBlock({ label, text }: { label: string; text: string }) {
    const { codeCopied } = useMessages().guides;
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }, [text]);

    return (
        <div className="overflow-hidden rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)]">
            <div className="flex items-center justify-between border-b border-[var(--adaptive-border)] px-[1.6rem] py-[1.2rem]">
                <strong className="font-[family-name:var(--font-manrope)] text-[1.4rem]">{label}</strong>
                <button type="button" onClick={copy} className="inline-flex items-center gap-[0.6rem] text-[1.3rem] text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]">
                    {copied ? <Check className="size-[1.5rem]" aria-hidden /> : <Copy className="size-[1.5rem]" aria-hidden />}
                    {copied ? codeCopied : label}
                </button>
            </div>
            <pre className="whitespace-pre-wrap p-[1.6rem] font-[family-name:var(--font-inter)] text-[1.5rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">{text}</pre>
        </div>
    );
}
