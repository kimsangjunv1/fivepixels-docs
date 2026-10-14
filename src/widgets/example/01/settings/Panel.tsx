"use client";

import * as Layer from "@/widgets/example/01/settings/ui";

export default function Panel() {
    return (
        <div className="flex flex-col gap-[2.4rem]">
            <Layer.SettingsHeading />
            <Layer.WorkspaceSettings />
            <Layer.Modal />
        </div>
    );
}
