import { changelogEntries, changelogTypeLabels } from "@/entities/content";
import { SITE_NAME, SITE_URL } from "@/shared/lib/site";

function escapeXml(value: string) {
    return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ?? character);
}

export function GET() {
    const items = changelogEntries
        .map(
            (entry) => `
                <item>
                    <title>${escapeXml(entry.title)}</title>
                    <link>${SITE_URL}/changelog/${entry.slug}</link>
                    <guid>${SITE_URL}/changelog/${entry.slug}</guid>
                    <pubDate>${new Date(`${entry.date}T00:00:00Z`).toUTCString()}</pubDate>
                    <category>${escapeXml(changelogTypeLabels[entry.changeType])}</category>
                    <description>${escapeXml(entry.summary)}</description>
                </item>`,
        )
        .join("");

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${SITE_NAME} changelog</title>
                <link>${SITE_URL}/changelog</link>
                <description>New fivepixels features, improvements, and fixes.</description>
                ${items}
            </channel>
        </rss>`;

    return new Response(feed, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
