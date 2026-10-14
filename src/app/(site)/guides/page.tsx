import type { Metadata } from "next";
import { guidesEn } from "@/shared/i18n/guide/en";
import { createPageMetadata } from "@/shared/lib/seo";
import { Main } from "@/widgets/layout/Main";
import { GuidesView } from "@/views/guides/GuidesView";

export const metadata: Metadata = createPageMetadata({
    title: "Fivepixels guides",
    description: guidesEn.description,
    path: "/guides",
    keywords: ["fivepixels", "adoption guide", "developer docs", "React review"],
});

export default function GuidesPage() {
    return (
        <Main id="fivepixels-guides" className={{ container: "min-h-screen bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]", inner: "" }}>
            <GuidesView />
        </Main>
    );
}
