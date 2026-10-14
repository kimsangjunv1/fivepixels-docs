"use client";

import type { NewsletterPost } from "@/entities/content";
import * as Layer from "@/widgets/newsletter/[slug]/ui";

export default function Panel({ post }: { post: NewsletterPost; }) {
    return (
        <main className="min-h-screen bg-[var(--adaptive-background)] pt-[calc(var(--site-banner-height)+7.2rem)] text-[var(--adaptive-text-primary)]">
            <article className="mx-auto w-full max-w-[84rem] px-[1.6rem] py-[5.6rem] tablet:px-[6.4rem] tablet:py-[8rem]">
                <Layer.BackLink />
                <Layer.NewsletterHeading post={post} />
                <Layer.NewsletterBody post={post} />
            </article>
            <Layer.Modal />
        </main>
    );
}
