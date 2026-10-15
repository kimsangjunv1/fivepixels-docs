import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GuideCollectionMessages } from "@/shared/i18n/guide/types";
import { cn } from "@/shared/lib/utils";

export function DocumentNavigation({ collection, slug }: { collection: GuideCollectionMessages; slug: string }) {
    const navigation = collection.pages[slug]?.navigation;
    const previous = navigation?.previous ? collection.pages[navigation.previous] : undefined;
    const next = navigation?.next ? collection.pages[navigation.next] : undefined;
    if (!previous && !next) return null;

    return (
        <nav aria-label="Document steps" className="grid grid-cols-1 gap-[1.2rem] px-[3.2rem] pt-[3.2rem] sm:grid-cols-2 lg:px-[5.6rem]">
            {[{ page: previous, direction: "previous" }, { page: next, direction: "next" }].map(({ page, direction }) => {
                if (!page) return null;
                const isNext = direction === "next";
                const Arrow = isNext ? ArrowRight : ArrowLeft;
                return (
                    <Link
                        key={direction}
                        href={`${collection.basePath}/${page.slug}`}
                        rel={isNext ? "next" : "prev"}
                        className={cn(
                            "group flex min-h-[10.4rem] items-center gap-[1.6rem] rounded-[0.6rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem] transition-[border-color,box-shadow] hover:border-[var(--adaptive-grey400)] hover:shadow-[var(--adaptive-popup-shadow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--adaptive-accent-coral)]",
                            isNext && "flex-row-reverse text-right sm:col-start-2",
                        )}
                    >
                        <Arrow aria-hidden className="size-[1.8rem] shrink-0 text-[var(--adaptive-text-muted)] transition-colors group-hover:text-[var(--adaptive-accent-coral)]" />
                        <span className="min-w-0 flex-1">
                            <span className="block text-[1.3rem] text-[var(--adaptive-text-muted)]">{isNext ? "Next Step" : "Previous Step"}</span>
                            <span className="mt-[0.6rem] block text-[1.5rem] font-medium leading-[1.5] text-[var(--adaptive-text-primary)] group-hover:text-[var(--adaptive-accent-coral)]">{page.title}</span>
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
