import { Example01ModalsView } from "@/views/example/01/modals/Example01ModalsView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Modal Lab",
    description: "Hard-test modal edge cases for DOM feedback markers.",
    path: "/example/01/modals",
    noIndex: true,
});

export default function Example01ModalsPage() {
    return <Example01ModalsView />;
}
