import type { ComponentProps } from "react";
import { NewsletterDetailPanel } from "@/widgets/newsletter/[slug]";

export function NewsletterDetailView(props: ComponentProps<typeof NewsletterDetailPanel>) {
    return <NewsletterDetailPanel {...props} />;
}
