import type { ComponentProps } from "react";
import { ChangelogDetailPanel } from "@/widgets/changelog/[slug]";

export function ChangelogDetailView(props: ComponentProps<typeof ChangelogDetailPanel>) {
    return <ChangelogDetailPanel {...props} />;
}
