"use client";

import * as Layer from "@/widgets/roadmap/ui";

export default function Panel() {
    return (
        <main className="min-h-screen bg-[var(--adaptive-background)] pt-[calc(var(--site-banner-height)+7.2rem)] text-[var(--adaptive-text-primary)]">
            <div className="mx-auto w-full max-w-[115.2rem] px-[1.6rem] py-[5.6rem] tablet:px-[6.4rem] tablet:py-[8rem] pc:px-[9.6rem]">
                <Layer.RoadmapHeading />
                <Layer.RoadmapBoard />
            </div>
            <Layer.Modal />
        </main>
    );
}
