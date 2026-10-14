import { Example01View } from "@/views/example/01/Example01View";

import { createPageMetadata } from "@/shared/lib/seo";
import { SITE_DESCRIPTION } from "@/shared/lib/site";

export const metadata = createPageMetadata({
    title: "Example Dashboard",
    description: `${SITE_DESCRIPTION} Install-free interactive demo for DOM feedback markers.`,
    path: "/example/01",
    keywords: ["fivepixels", "example", "QA demo", "DOM feedback", "React"],
    noIndex: true,
});

export default function Example01Page() {
    return <Example01View />;
}
