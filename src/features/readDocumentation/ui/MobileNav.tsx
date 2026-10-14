"use client";

import Link from "next/link";
import type { GuideCollectionMessages, GuidePageMessages } from "@/shared/i18n/guide/types";
import { cn } from "@/shared/lib/utils";

export function MobileNav({ collection, page }: { collection: GuideCollectionMessages; page: GuidePageMessages }) {
    const items = collection.navGroups.flatMap((group) => group.items);

    return (
        <nav className="sticky top-[7.2rem] z-10 flex gap-[0.8rem] overflow-x-auto border-b border-[var(--adaptive-border)] bg-[var(--adaptive-surface-overlay)] px-[1.2rem] py-[1.2rem] backdrop-blur min-[1100px]:hidden" aria-label={collection.title}>
            {items.map((item) => (
                <Link key={item.slug} href={`${collection.basePath}/${item.slug}`} className={cn("shrink-0 rounded-full border px-[1.2rem] py-[0.8rem] text-[1.2rem] whitespace-nowrap transition-colors", page.slug === item.slug ? "border-[var(--adaptive-surface-inverse)] bg-[var(--adaptive-surface-inverse)] text-[var(--adaptive-text-inverse)]" : "border-[var(--adaptive-border)] text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]")}>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}
