import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guidesEn } from "@/shared/i18n/guide/en";
import { createPageMetadata } from "@/shared/lib/seo";
import { Main } from "@/widgets/layout/Main";
import { GuidesDetailView } from "@/views/guides/[slug]/GuidesDetailView";

export function generateStaticParams() {
    return Object.keys(guidesEn.pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = guidesEn.pages[slug];
    if (!page) return {};

    return createPageMetadata({ title: page.title, description: page.description, path: `/guides/${slug}`, keywords: ["fivepixels", "adoption guide", "QA", "staging review"] });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!guidesEn.pages[slug]) notFound();

    return (
        <Main id="fivepixels-guides" className={{ container: "fivepixels-guide min-h-screen bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]", inner: "" }}>
            <GuidesDetailView slug={slug} />
        </Main>
    );
}
