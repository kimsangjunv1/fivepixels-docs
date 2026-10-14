"use client";

import { useMessages } from "@/shared/i18n/useMessages";

export function HowItWorksSection() {
    const { steps } = useMessages().fivepixels.howItWorks;

    return (
        <section
            className="w-full border-b border-[var(--adaptive-border)] bg-[var(--fp-bg)] px-[1.2rem] tablet:px-[2.4rem]"
            id="how-it-works"
        >
            <div className="mx-auto grid w-full max-w-[var(--size-pc)] gap-[1px] border-x border-[var(--adaptive-border)] tablet:grid-cols-3">
                {steps.map((step) => (
                    <article
                        className="flex min-h-[20rem] flex-col justify-between p-[2.4rem] tablet:min-h-[24rem] tablet:p-[3.2rem]"
                        key={step.number}
                    >
                        <span className="font-[family-name:var(--font-manrope)] text-[1.4rem] text-[var(--fp-text-description)]">{step.number}</span>
                        <div>
                            <h3 className="text-[2.6rem] font-semibold leading-[1.02] text-[var(--fp-text-emphasis)] tablet:text-[2.8rem]">{step.title}</h3>
                            <p className="mt-[1.2rem] max-w-[28rem] text-[1.6rem] leading-[1.55] text-[var(--fp-text-description)]">{step.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
