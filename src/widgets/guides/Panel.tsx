"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import * as Layer from "@/widgets/guides/ui";

export default function Panel() {
    const { guides, docs } = useMessages();
    return (
        <div className="overflow-x-hidden bg-[var(--adaptive-background)] pt-[7.2rem] font-[family-name:var(--font-inter)]">
            <div className="mx-auto w-full max-w-[var(--size-pc)] border-x border-[var(--adaptive-border)]">
                <Layer.GuideIntroduction />
                <Layer.FrameworkSetup guides={guides} />
                <Layer.PersistenceSetup />
                <Layer.GettingStarted guides={guides} />
                <Layer.ReviewWorkflow guides={guides} />
                <Layer.AdoptionResources guides={guides} />
                <Layer.DeveloperDocumentation docs={docs} />
                <Layer.ExploreResources />
                <Layer.SelfHosting />
            </div>
            <Layer.Modal />
        </div>
    );
}
