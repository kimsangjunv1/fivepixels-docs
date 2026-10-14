"use client";

import * as Layer from "@/widgets/example/01/releases/ui";

export default function Panel() {
    return (
        <div className="flex flex-col gap-[2.4rem]">
            <Layer.ReleasesHeading />
            <Layer.ReleaseList />
            <Layer.Modal />
        </div>
    );
}
