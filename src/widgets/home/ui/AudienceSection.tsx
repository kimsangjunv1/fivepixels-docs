"use client";

import { useMessages } from "@/shared/i18n/useMessages";

export function AudienceSection() {
    const { cards } = useMessages().fivepixels.audience;

    return (
        <section
            className="w-full border-b border-b-[var(--adaptive-border)]"
            id="audience"
        >
            <div className="mx-auto flex w-full max-w-[var(--size-pc)] flex-col gap-[3.2rem] border-x border-x-[var(--adaptive-border)]">
                <div className="grid gap-[1px] tablet:grid-cols-2">
                    {cards.map((audience) => (
                        <article
                            className="flex min-h-[18rem] flex-col justify-end p-[2.4rem] tablet:p-[3.2rem]"
                            key={audience.title}
                        >
                            <h3 className="text-[3rem] font-semibold leading-[1]">{audience.title}</h3>
                            <p className="mt-[1.2rem] max-w-[34rem] text-[1.6rem] leading-[1.55] text-[var(--adaptive-text-secondary)]">{audience.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
