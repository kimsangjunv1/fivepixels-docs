import { Example01ReviewsView } from "@/views/example/01/reviews/Example01ReviewsView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Reviews",
    description: "Review queue demo with opacity and zustand modal cases.",
    path: "/example/01/reviews",
    noIndex: true,
});

export default function Example01ReviewsPage() {
    return <Example01ReviewsView />;
}
