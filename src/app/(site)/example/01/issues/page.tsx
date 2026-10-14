import { Example01IssuesView } from "@/views/example/01/issues/Example01IssuesView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Issues",
    description: "Issue tracker demo with modal edge cases for DOM feedback testing.",
    path: "/example/01/issues",
    noIndex: true,
});

export default function Example01IssuesPage() {
    return <Example01IssuesView />;
}
