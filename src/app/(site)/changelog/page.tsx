import { ChangelogView } from "@/views/changelog/ChangelogView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Changelog",
    description: "New fivepixels features, improvements, fixes, and documentation updates.",
    path: "/changelog",
});

export default function ChangelogPage() {
    return <ChangelogView />;
}
