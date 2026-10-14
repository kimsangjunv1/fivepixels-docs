import { Example01SettingsView } from "@/views/example/01/settings/Example01SettingsView";

import { createPageMetadata } from "@/shared/lib/seo";

export const metadata = createPageMetadata({
    title: "Settings",
    description: "Workspace settings demo for form and toggle feedback testing.",
    path: "/example/01/settings",
    noIndex: true,
});

export default function Example01SettingsPage() {
    return <Example01SettingsView />;
}
