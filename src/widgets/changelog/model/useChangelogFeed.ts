"use client";

import { useMemo, useState } from "react";
import type { ChangelogEntry, ChangelogType } from "@/entities/content";
import { toMarkdown } from "@/entities/content/lib/toMarkdown";

export function useChangelogFeed(entries: ChangelogEntry[]) {
    const [activeType, setActiveType] = useState<ChangelogType | "all">("all");
    const [copied, setCopied] = useState(false);
    const types = useMemo(() => Array.from(new Set(entries.map((entry) => entry.changeType))), [entries]);
    const visibleEntries = activeType === "all" ? entries : entries.filter((entry) => entry.changeType === activeType);

    const copyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(toMarkdown(visibleEntries));
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    };
    return { activeType, setActiveType, copied, types, visibleEntries, copyMarkdown };
}
