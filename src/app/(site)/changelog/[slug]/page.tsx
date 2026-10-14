import { ChangelogDetailView } from "@/views/changelog/[slug]/ChangelogDetailView";

import { notFound } from "next/navigation";
import { changelogEntries } from "@/entities/content";
import { createPageMetadata } from "@/shared/lib/seo";

import type { Metadata } from "next";

type ChangelogDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return changelogEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: ChangelogDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const entry = changelogEntries.find((item) => item.slug === slug);

    if (!entry) return {};

    return createPageMetadata({
        title: entry.title,
        description: entry.summary,
        path: `/changelog/${entry.slug}`,
    });
}

export default async function ChangelogDetailPage({ params }: ChangelogDetailPageProps) {
    const { slug } = await params;
    const entry = changelogEntries.find((item) => item.slug === slug);

    if (!entry) notFound();


    return <ChangelogDetailView entry={entry} />;
}
