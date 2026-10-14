"use client";

import { Check, X } from "lucide-react";
import type { GuideCollectionMessages, GuidePageMessages } from "@/shared/i18n/guide/types";
import { useGuideProvider } from "@/features/readDocumentation/model/GuideContext";
import { cn } from "@/shared/lib/utils";

export function TableOfContents({ collection, page }: { collection: GuideCollectionMessages; page: GuidePageMessages }) {
    const { activeSectionId } = useGuideProvider();

    return (
        <aside className="hidden w-[25.6rem] shrink-0 border-l border-[var(--adaptive-border)] min-[1100px]:block">
            <div className="sticky top-[7.2rem] max-h-[calc(100vh-7.2rem)] overflow-y-auto px-[3.2rem] py-[4.8rem]">
                <p className="font-mono text-[1.2rem] uppercase tracking-[0.08em] text-[var(--adaptive-text-primary)]">Is this helpful?</p>
                <div className="mt-[1.6rem] flex gap-[1.2rem]">
                    <button
                        type="button"
                        aria-label="Not helpful"
                        className="grid size-[3.8rem] place-items-center rounded-full border border-[var(--adaptive-border)] text-[var(--adaptive-text-muted)] transition-colors hover:border-[var(--adaptive-grey400)] hover:text-[var(--adaptive-text-primary)]"
                    >
                        <X className="size-[1.7rem]" />
                    </button>
                    <button
                        type="button"
                        aria-label="Helpful"
                        className="grid size-[3.8rem] place-items-center rounded-full border border-[var(--adaptive-border)] text-[var(--adaptive-text-muted)] transition-colors hover:border-[var(--adaptive-grey400)] hover:text-[var(--adaptive-text-primary)]"
                    >
                        <Check className="size-[1.7rem]" />
                    </button>
                </div>

                {/* <div className="mt-[5.6rem]">
                    <p className="font-mono text-[1.2rem] uppercase tracking-[0.08em] text-[var(--adaptive-text-primary)]">AI tools</p>
                    <div className="mt-[1.6rem] space-y-[1.2rem] text-[1.35rem] text-[var(--adaptive-text-muted)]">
                        <span className="flex items-center gap-[1rem] leading-[1.5]"><Sparkles className="size-[1.5rem] shrink-0" /> Connect your AI agent</span>
                        <span className="flex items-center gap-[1rem] leading-[1.5]"><Copy className="size-[1.5rem] shrink-0" /> Copy as Markdown</span>
                        <span className="flex items-center gap-[1rem] leading-[1.5]"><MessageCircle className="size-[1.5rem] shrink-0" /> Ask about this guide</span>
                    </div>
                </div> */}

                <nav
                    className="mt-[5.6rem]"
                    aria-label={collection.onThisPage}
                >
                    <p className="font-mono text-[1.2rem] uppercase tracking-[0.08em] text-[var(--adaptive-text-primary)]">On this page</p>
                    <ol className="mt-[1.6rem] space-y-[1.2rem]">
                        {page.sections.map((section, index) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={cn(
                                        "block text-[1.35rem] leading-[1.5] transition-colors",
                                        activeSectionId === section.id
                                            ? "font-medium text-[var(--adaptive-accent-coral)]"
                                            : "text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]",
                                    )}
                                >
                                    {index + 1}. {section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </aside>
    );
}
