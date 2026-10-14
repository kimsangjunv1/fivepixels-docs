import type { NewsletterPost } from "@/entities/content";
import { formatContentDate } from "@/shared/lib/formatContentDate";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ContentSections } from "@/features/readContent/ui/ContentSections";

export function BackLink() {
    return (
        <Link
            className="inline-flex items-center gap-[0.7rem] text-[1.3rem] text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]"
            href="/newsletter"
        >
            <ArrowLeft size={15} />
            Newsletter
        </Link>
    );
}

export function NewsletterHeading({ post }: { post: NewsletterPost; }) {
    return (
        <header className="mt-[5.6rem] border-b border-[var(--adaptive-border)] pb-[4.8rem]">
            <span className="text-[1.1rem] font-semibold uppercase tracking-[0.16em] text-[var(--adaptive-accent-coral)]">Issue {post.issue}</span>
            <h1 className="mt-[1.8rem] text-[4.4rem] font-semibold leading-[1.06] tracking-[-0.055em] tablet:text-[6.4rem]">{post.title}</h1>
            <p className="mt-[2rem] text-[1.9rem] leading-[1.7] text-[var(--adaptive-text-secondary)]">{post.excerpt}</p>
            <div className="mt-[2.4rem] flex flex-wrap gap-[1rem] text-[1.2rem] text-[var(--adaptive-text-muted)]">
                <span>{post.category}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatContentDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
            </div>
        </header>
    );
}

export function NewsletterBody({ post }: { post: NewsletterPost; }) {
    return (
        <div className="pt-[4.8rem]">
            <ContentSections sections={post.sections} />
        </div>
    );
}
