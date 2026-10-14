import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsEn } from "@/shared/i18n/guide/en";
import { createPageMetadata } from "@/shared/lib/seo";
import { Main } from "@/widgets/layout/Main";
import { DocsDetailView } from "@/views/docs/[slug]/DocsDetailView";

export function generateStaticParams() {
    return Object.keys(docsEn.pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = docsEn.pages[slug];
    if (!page) return {};

    return createPageMetadata({ title: page.title, description: page.description, path: `/docs/${slug}`, keywords: ["fivepixels", "React", "FivePixelsAdapter", "DOM feedback"] });
}

export default async function DocsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!docsEn.pages[slug]) notFound();

    return (
        <Main id="fivepixels-docs" className={{ container: "fivepixels-guide min-h-screen bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]", inner: "" }}>
            <DocsDetailView slug={slug} />
        </Main>
    );
}
