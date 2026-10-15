"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import * as Layer from "@/widgets/docs/ui";

export default function Panel() {
    const { docs } = useMessages();
    return (
        <div className="overflow-x-hidden bg-[var(--adaptive-background)] pt-[7.2rem] font-[family-name:var(--font-inter)]">
            <div className="mx-auto w-full max-w-[var(--size-pc)] border-x border-[var(--adaptive-border)]">
                <Layer.GuideIntroduction />
                <Layer.FrameworkSetup docs={docs} />
                <Layer.GettingStarted docs={docs} />
                <Layer.PersistenceSetup />
                <Layer.ReviewWorkflow docs={docs} />
                <Layer.AdoptionResources docs={docs} />
            </div>
            <Layer.Modal />
        </div>
    );
}
