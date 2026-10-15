import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { GuideCollectionMessages, GuideHero } from "@/shared/i18n/guide/types";
import { RichText } from "@/shared/ui/rich-text";

export function QuickStartHero({ collection, hero }: { collection: GuideCollectionMessages; hero: GuideHero }) {
    return (
        <header className="border-b border-[var(--adaptive-border)] px-[3.2rem] pb-[5.6rem] pt-[4.8rem] lg:px-[5.6rem] lg:pb-[7.2rem]">
            <nav className="flex flex-wrap items-center gap-[0.8rem] text-[1.35rem] text-[var(--adaptive-text-muted)]" aria-label="Breadcrumb">
                <Link className="transition-colors hover:text-[var(--adaptive-text-primary)]" href={collection.basePath}>
                    {collection.title}
                </Link>
                <ChevronRight className="size-[1.5rem]" aria-hidden />
                <span className="text-[var(--adaptive-text-primary)]">{hero.eyebrow}</span>
            </nav>
            <h1 className="mt-[4rem] font-[family-name:var(--font-manrope)] text-[4.8rem] font-semibold leading-[1.12] tracking-[-0.04em] text-[var(--adaptive-text-primary)] mobile:text-[3.4rem]">{hero.title}</h1>
            <p className="mt-[2rem] max-w-[72rem] text-[2rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                <RichText text={hero.description} />
            </p>
        </header>
    );
}
