import { GuidesDetailPanel } from "@/widgets/guides/[slug]";

export function GuidesDetailView({ slug }: { slug: string }) {
    return <GuidesDetailPanel key={slug} slug={slug} />;
}
