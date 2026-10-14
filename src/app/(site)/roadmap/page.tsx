import { RoadmapView } from "@/views/roadmap/RoadmapView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Roadmap",
    description: "What fivepixels is building now, planning next, and exploring for later.",
    path: "/roadmap",
});

export default function RoadmapPage() {
    return <RoadmapView />;
}
