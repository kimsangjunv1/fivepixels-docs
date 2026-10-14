import { DocsDetailPanel } from "@/widgets/docs/[slug]";

export function DocsDetailView({ slug }: { slug: string }) {
    return <DocsDetailPanel key={slug} slug={slug} />;
}
