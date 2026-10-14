"use client";

import type { ChangelogEntry } from "@/entities/content";
import * as Layer from "@/widgets/changelog/[slug]/ui";

export default function Panel({ entry }: { entry: ChangelogEntry; }) {
    return (
        <main className="min-h-screen bg-[var(--adaptive-background)] pt-[calc(var(--site-banner-height)+7.2rem)] text-[var(--adaptive-text-primary)]">
            <div className="mx-auto w-full max-w-[115.2rem] px-[1.6rem] py-[5.6rem] tablet:px-[6.4rem] tablet:py-[8rem] pc:px-[9.6rem]">
                <Layer.BackLink />
                <div className="mt-[5.6rem] grid gap-[5.6rem] lg:grid-cols-12 lg:gap-[6.4rem]">
                    <article className="lg:col-span-8">
                        <Layer.ChangeSummary entry={entry} />
                        <Layer.ChangeBody entry={entry} />
                    </article>
                    <Layer.ChangeMetadata entry={entry} />
                </div>
            </div>
            <Layer.Modal />
        </main>
    );
}
