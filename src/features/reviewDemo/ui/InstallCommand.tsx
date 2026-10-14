"use client";

import { Link as LinkIcon } from "lucide-react";
import { useCallback, useState } from "react";

const COMMAND = "npm i @fivepixels-js/react";

export function InstallCommand() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        await navigator.clipboard.writeText(COMMAND);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    }, []);

    return (
        <button
            className="flex w-max max-w-full items-center gap-[1.6rem] border border-[var(--adaptive-text-primary)] p-[1.2rem_1.6rem] font-[family-name:var(--font-inter)] text-[1.4rem] transition-colors hover:bg-[var(--adaptive-greyOpacity100)]"
            onClick={handleCopy}
            type="button"
        >
            <span className="truncate">{COMMAND}</span>
            <span className="h-[1.6rem] w-[0.1rem] shrink-0 bg-[var(--adaptive-text-primary)]" />
            <span className="flex shrink-0 items-center gap-[0.6rem] text-[1.2rem] text-[var(--adaptive-text-muted)]">
                <LinkIcon
                    size={14}
                    strokeWidth={2.4}
                />
                {copied ? "Copied" : "Copy"}
            </span>
        </button>
    );
}
