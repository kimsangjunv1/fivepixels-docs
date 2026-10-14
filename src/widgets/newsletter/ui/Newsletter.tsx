import { formatContentDate } from "@/shared/lib/formatContentDate";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { newsletterPosts } from "@/entities/content";

export function NewsletterHeading() {
    return (
        <header className="max-w-[72rem] border-b border-[var(--adaptive-border)] pb-[4.8rem]">
            <span className="text-[1.1rem] font-semibold uppercase tracking-[0.16em] text-[var(--adaptive-accent-coral)]">Field notes</span>
            <h1 className="mt-[1.4rem] text-[4.4rem] font-semibold tracking-[-0.055em] tablet:text-[6.4rem]">Newsletter</h1>
            <p className="mt-[1.6rem] text-[1.8rem] leading-[1.7] text-[var(--adaptive-text-muted)]">Short, practical notes on keeping product feedback close to the interface.</p>
        </header>
    );
}

export function NewsletterGrid() {
    return (
        <div className="mt-[5.6rem] grid gap-px overflow-hidden border border-[var(--adaptive-border)] bg-[var(--adaptive-border)] tablet:grid-cols-2">
            {newsletterPosts.map((post, index) => (
                <Link
                    key={post.slug}
                    href={`/newsletter/${post.slug}`}
                    className={`group flex min-h-[30rem] flex-col bg-[var(--adaptive-surface)] p-[2.8rem] transition-colors hover:bg-[var(--adaptive-grey50)] tablet:p-[4rem] ${index === 0 ? "tablet:col-span-2 tablet:min-h-[38rem]" : ""}`}
                >
                    <div className="flex items-center justify-between gap-[2rem] text-[1.15rem] text-[var(--adaptive-text-muted)]">
                        <span>ISSUE {post.issue}</span>
                        <ArrowUpRight className="transition-transform group-hover:-translate-y-[0.3rem] group-hover:translate-x-[0.3rem]" size={18} />
                    </div>
                    <div className="mt-auto max-w-[76rem] pt-[8rem]">
                        <div className="flex flex-wrap items-center gap-[1rem] text-[1.2rem] text-[var(--adaptive-text-muted)]">
                            <span>{post.category}</span>
                            <span aria-hidden>·</span>
                            <time dateTime={post.date}>{formatContentDate(post.date)}</time>
                            <span aria-hidden>·</span>
                            <span>{post.readingTime}</span>
                        </div>
                        <h2 className={`mt-[1.6rem] font-semibold leading-[1.08] tracking-[-0.045em] ${index === 0 ? "text-[3.8rem] tablet:text-[5.2rem]" : "text-[3rem]"}`}>{post.title}</h2>
                        <p className="mt-[1.6rem] max-w-[64rem] text-[1.55rem] leading-[1.7] text-[var(--adaptive-text-secondary)]">{post.excerpt}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
