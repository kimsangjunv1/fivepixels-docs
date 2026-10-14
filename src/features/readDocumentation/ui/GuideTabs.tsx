"use client";

import { useState } from "react";
import type { GuideBlock } from "@/shared/i18n/guide/types";
import { cn } from "@/shared/lib/utils";

export function GuideTabs({ tabs, renderBlocks }: { tabs: { label: string; blocks: GuideBlock[] }[]; renderBlocks: (blocks: GuideBlock[]) => React.ReactNode }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeTab = tabs[activeIndex];

    return (
        <div className="overflow-hidden rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)]">
            <div className="flex border-b border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] p-[0.4rem]" role="tablist">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        type="button"
                        role="tab"
                        aria-selected={activeIndex === index}
                        className={cn(
                            "flex-1 rounded-[0.6rem] px-[1.6rem] py-[1.1rem] text-[1.4rem] font-medium transition-colors",
                            activeIndex === index ? "bg-[var(--adaptive-surface)] text-[var(--adaptive-text-primary)] shadow-[var(--adaptive-popup-shadow)]" : "text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]",
                        )}
                        onClick={() => setActiveIndex(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-[2.4rem] p-[1.6rem] tablet:p-[2.4rem]" role="tabpanel">
                {activeTab ? renderBlocks(activeTab.blocks) : null}
            </div>
        </div>
    );
}
