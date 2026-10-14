import { Example01ReleasesView } from "@/views/example/01/releases/Example01ReleasesView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Releases",
    description: "Release notes demo with scrollable modal triggers.",
    path: "/example/01/releases",
    noIndex: true,
});

export default function Example01ReleasesPage() {
    return <Example01ReleasesView />;
}
