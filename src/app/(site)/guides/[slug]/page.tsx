import { notFound, redirect } from "next/navigation";
import { docsEn } from "@/shared/i18n/guide/en";

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const legacyPages: Record<string, string> = {
        rollout: "setup", rules: "workflow", roles: "workflow",
        "dom-tagging": "dom-attributes", "self-hosting": "artemis72", shortcuts: "modes",
    };
    const destination = legacyPages[slug] ?? slug;
    if (!docsEn.pages[destination]) notFound();
    redirect(`/docs/${destination}`);
}
