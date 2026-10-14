"use client";

import { useMemo } from "react";
import { useMessages } from "@/shared/i18n/useMessages";
import { GuidesDetailPageProvider } from "./model/GuidesDetailContext";
import * as Layer from "@/widgets/guides/[slug]/ui";

export default function Panel({ slug }: { slug: string }) {
    const collection = useMessages().guides;
    const page = collection.pages[slug];
    const sectionIds = useMemo(() => page?.sections.map((section) => section.id) ?? [], [page]);
    if (!page) return null;

    return (
        <GuidesDetailPageProvider sectionIds={sectionIds}>
            <div className="min-h-screen bg-[var(--adaptive-background)] font-[family-name:var(--font-inter)] text-[1.8rem] text-[var(--adaptive-text-primary)]">
                <div className="mx-auto flex w-full max-w-[var(--size-pc)] border-x border-[var(--adaptive-border)] pt-[7.2rem]">
                    <Layer.Sidebar collection={collection} page={page} />
                    <div className="min-w-0 flex-1">
                        <Layer.MobileNav collection={collection} page={page} />
                        <Layer.Document collection={collection} hero={page.hero} sections={page.sections} />
                    </div>
                    <Layer.TableOfContents collection={collection} page={page} />
                </div>
            </div>
            <Layer.Modal />
        </GuidesDetailPageProvider>
    );
}
