"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, Copy, Sparkles } from "lucide-react";
import type { GuideCollectionMessages, GuideHero } from "@/shared/i18n/guide/types";
import { GUIDE_SNIPPETS } from "@/shared/i18n/guide/snippets";
import { useMessages } from "@/shared/i18n/useMessages";
import { RichText } from "@/shared/ui/rich-text";

const expandedText = "font-[family-name:var(--font-manrope)] font-semibold tracking-[-0.04em]";

export function QuickStartHero({ collection, hero }: { collection: GuideCollectionMessages; hero: GuideHero }) {
    const guide = useMessages().guides;
    const installCode = hero.installCommand ?? GUIDE_SNIPPETS.install;
    const showInstall = hero.installCommand !== "";
    const promptText = `Help me follow the ${hero.title} guide. ${hero.description} ${showInstall ? `Start by running ${installCode}, then review the project and suggest the next steps.` : "Review the current project and turn this guidance into concrete next steps."}`;
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        };
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            setCopied(true);
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
            resetTimerRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }, [promptText]);

    return (
        <header className="border-b border-[var(--adaptive-border)] px-[3.2rem] pb-[5.6rem] pt-[4.8rem] lg:px-[5.6rem] lg:pb-[7.2rem]">
            <nav
                className="flex flex-wrap items-center gap-[0.8rem] text-[1.35rem] text-[var(--adaptive-text-muted)]"
                aria-label="Breadcrumb"
            >
                <Link
                    className="transition-colors hover:text-[var(--adaptive-text-primary)]"
                    href={collection.basePath}
                >
                    {collection.title}
                </Link>
                <ChevronRight className="size-[1.5rem]" />
                <span className="text-[var(--adaptive-text-primary)]">{hero.eyebrow}</span>
            </nav>

            <h1 className={`${expandedText} mt-[4rem] text-[4.8rem] leading-[1.12] text-[var(--adaptive-text-primary)] mobile:text-[3.4rem]`}>{hero.title}</h1>

            <p className="mt-[2rem] max-w-[72rem] text-[2rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                <RichText text={hero.description} />
            </p>

            <div className="relative mt-[4rem] overflow-hidden rounded-[1rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] shadow-[var(--adaptive-popup-shadow)]">
                <div className="flex h-[5.6rem] items-center justify-between border-b border-[var(--adaptive-border)] px-[2rem]">
                    <span className="flex items-center gap-[1rem] text-[1.4rem] font-medium text-[var(--adaptive-text-secondary)]">
                        <Sparkles className="size-[1.6rem]" />
                        Tip
                    </span>
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label={copied ? guide.codeCopied : guide.codeCopy}
                        className="text-[var(--adaptive-text-muted)] transition-colors hover:text-[var(--adaptive-text-primary)]"
                    >
                        {copied ? <Check className="size-[1.7rem] text-[var(--adaptive-accent-coral)]" /> : <Copy className="size-[1.7rem]" />}
                    </button>
                </div>
                <div className={expanded ? "p-[2rem]" : "max-h-[15.2rem] overflow-hidden p-[2rem]"}>
                    <p className="text-[1.55rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                        Help me follow the <strong className="font-semibold text-[var(--adaptive-text-primary)]">{hero.title}</strong> guide. {hero.description}
                        {showInstall ? (
                            <>
                                {" "}
                                Start by running{" "}
                                <code className="rounded-[0.4rem] bg-[var(--adaptive-grey100)] px-[0.5rem] py-[0.2rem] text-[1.35rem] text-[var(--adaptive-text-primary)]">{installCode}</code>, then
                                review the project and suggest the next steps.
                            </>
                        ) : (
                            <> Review the current project and turn this guidance into concrete next steps.</>
                        )}
                    </p>
                </div>
                {!expanded ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[7.2rem] bg-gradient-to-t from-[var(--adaptive-surface)] via-[var(--adaptive-surface)]/95 to-transparent" />
                ) : null}
                <button
                    type="button"
                    onClick={() => setExpanded((value) => !value)}
                    className="relative z-[1] mx-[2rem] mb-[2rem] text-[1.4rem] font-medium text-[var(--adaptive-accent-coral)] hover:text-[var(--adaptive-accent-coral-hover)]"
                >
                    {expanded ? "Show less" : "Show more"}
                </button>
            </div>
        </header>
    );
}
