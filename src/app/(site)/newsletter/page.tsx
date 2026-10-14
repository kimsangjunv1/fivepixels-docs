import { NewsletterView } from "@/views/newsletter/NewsletterView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Newsletter",
    description: "Notes on interface review, product collaboration, and building fivepixels.",
    path: "/newsletter",
});

export default function NewsletterPage() {
    return <NewsletterView />;
}
