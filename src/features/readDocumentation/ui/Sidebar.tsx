"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import type { GuideCollectionMessages, GuidePageMessages } from "@/shared/i18n/guide/types";
import { cn } from "@/shared/lib/utils";

export function Sidebar({ collection, page }: { collection: GuideCollectionMessages; page: GuidePageMessages }) {
    return (
        <aside className="hidden w-[29.6rem] shrink-0 border-r border-[var(--adaptive-border)] min-[1100px]:block">
            <nav className="sticky top-[7.2rem] max-h-[calc(100vh-7.2rem)] overflow-y-auto px-[3.2rem] py-[4.8rem]">
                <Link href={collection.basePath} className="flex items-center gap-[1.4rem] font-[family-name:var(--font-manrope)] text-[2rem] font-semibold tracking-[-0.025em] text-[var(--adaptive-text-primary)]">
                    <Play className="size-[1.7rem] text-[var(--adaptive-accent-coral)]" strokeWidth={1.8} />
                    {collection.title}
                </Link>
                <div className="mt-[3.6rem] flex flex-col gap-[3.2rem]">
                    {collection.navGroups.map((group, groupIndex) => (
                        <div key={group.label}>
                            <p className={cn("mb-[1.2rem] font-[family-name:var(--font-manrope)] text-[1.2rem] font-semibold uppercase tracking-[0.12em]", groupIndex === 0 ? "text-[var(--adaptive-accent-coral)]" : "text-[var(--adaptive-text-secondary)]")}>{group.label}</p>
                            <ul className="flex flex-col gap-[0.2rem]">
                                {group.items.map((item) => {
                                    const active = page.slug === item.slug;
                                    return (
                                        <li key={item.slug}>
                                            <Link className={cn("block py-[0.7rem] text-[1.45rem] leading-[1.35] transition-colors", active ? "font-medium text-[var(--adaptive-accent-coral)]" : "text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]")} href={`${collection.basePath}/${item.slug}`}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </nav>
        </aside>
    );
}
