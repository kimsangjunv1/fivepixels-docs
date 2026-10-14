"use client";

import { ChangelogPageProvider } from "./model/ChangelogContext";
import * as Layer from "@/widgets/changelog/ui";

export default function Panel() {
    return (
        <ChangelogPageProvider>
            <main className="min-h-screen bg-[var(--adaptive-background)] pt-[calc(var(--site-banner-height)+7.2rem)] text-[var(--adaptive-text-primary)]">
                <div className="mx-auto flex w-full max-w-[115.2rem] flex-col px-[1.6rem] py-[5.6rem] tablet:px-[6.4rem] tablet:py-[8rem] pc:px-[9.6rem]">
                    <Layer.ChangelogHeading />
                    <Layer.FeedToolbar />
                    <Layer.EntryList />
                </div>
                <Layer.Modal />
            </main>
        </ChangelogPageProvider>
    );
}
