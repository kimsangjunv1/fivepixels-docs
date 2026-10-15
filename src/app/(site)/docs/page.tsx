import type { Metadata } from "next";
import { docsEn } from "@/shared/i18n/guide/en";
import { createPageMetadata } from "@/shared/lib/seo";
import { Main } from "@/widgets/layout/Main";
import { DocsView } from "@/views/docs/DocsView";

export const metadata: Metadata = createPageMetadata({
    title: "Fivepixels documentation",
    description: docsEn.description,
    path: "/docs",
    keywords: ["fivepixels", "documentation", "React", "Next.js"],
});

export default function DocsPage() {
    return (
        <Main id="fivepixels-docs" className={{ container: "min-h-screen bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]", inner: "" }}>
            <DocsView />
        </Main>
    );
}
