"use client";

import { useMessages } from "@/shared/i18n/useMessages";

export function CompareSection() {
    const compare = useMessages().fivepixels.compare;

    return (
        <section
            className="w-full px-[1.2rem] tablet:px-[2.4rem]"
            id="compare"
        >
            <div className="mx-auto flex w-full max-w-[var(--size-pc)] flex-col gap-[2.4rem]">
                <div className="overflow-hidden border border-[var(--adaptive-border)]">
                    <div className="grid grid-cols-2 bg-[var(--fp-bg)] text-[var(--fp-text-emphasis)]">
                        <div className="p-[1.6rem] font-[family-name:var(--font-manrope)] text-[1.3rem]">{compare.beforeHeader}</div>
                        <div className="border-l border-[var(--adaptive-border)] p-[1.6rem] font-[family-name:var(--font-manrope)] text-[1.3rem]">{compare.afterHeader}</div>
                    </div>

                    <div className="grid gap-[1px] bg-[var(--adaptive-border)]">
                        {compare.rows.map(([before, after]) => (
                            <div
                                className="grid grid-cols-1 bg-[var(--fp-bg)] tablet:grid-cols-2"
                                key={before}
                            >
                                <div className="p-[2rem] text-[1.7rem] leading-[1.5] text-[var(--fp-text-description)] tablet:p-[2.4rem]">{before}</div>
                                <div className="border-t border-[var(--adaptive-border)] p-[2rem] text-[1.7rem] font-medium leading-[1.5] text-[var(--fp-text-emphasis)] tablet:border-l tablet:border-t-0 tablet:p-[2.4rem]">{after}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
