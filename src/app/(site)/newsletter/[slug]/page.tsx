import { NewsletterDetailView } from "@/views/newsletter/[slug]/NewsletterDetailView";

import { notFound } from "next/navigation";
import { newsletterPosts } from "@/entities/content";
import { createPageMetadata } from "@/shared/lib/seo";

import type { Metadata } from "next";

type NewsletterDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return newsletterPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: NewsletterDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = newsletterPosts.find((item) => item.slug === slug);

    if (!post) return {};

    return createPageMetadata({
        title: post.title,
        description: post.excerpt,
        path: `/newsletter/${post.slug}`,
    });
}

export default async function NewsletterDetailPage({ params }: NewsletterDetailPageProps) {
    const { slug } = await params;
    const post = newsletterPosts.find((item) => item.slug === slug);

    if (!post) notFound();


    return <NewsletterDetailView post={post} />;
}
