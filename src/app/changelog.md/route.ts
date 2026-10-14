import { changelogEntries, changelogTypeLabels } from "@/entities/content";

export function GET() {
    const markdown = changelogEntries
        .map((entry) => {
            const sections = entry.sections
                .map((section) => [section.heading ? `## ${section.heading}` : "", ...(section.paragraphs ?? []), ...(section.items ?? []).map((item) => `- ${item}`)].filter(Boolean).join("\n\n"))
                .join("\n\n");

            return `# ${entry.title}\n\n${entry.date} · ${changelogTypeLabels[entry.changeType]}\n\n${entry.summary}\n\n${sections}`;
        })
        .join("\n\n---\n\n");

    return new Response(markdown, {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
}
