"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMessages } from "@/shared/i18n/useMessages";
import { revealEase } from "@/shared/lib/motion";
import { TailwindSyntaxCode } from "@/shared/ui/TailwindSyntaxCode";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";
import type { FivepixelsMessages } from "@/shared/i18n/landing/types";

type AdoptionStep = FivepixelsMessages["developerRelief"]["steps"][number];

const fadeTransition = {
    duration: 0.38,
    ease: revealEase,
} as const;

function FadePanel({ panelKey, prefersReducedMotion, className, children }: { panelKey: string; prefersReducedMotion: boolean; className?: string; children: React.ReactNode }) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={panelKey}
                className={className}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={prefersReducedMotion ? undefined : fadeTransition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

function DescriptionPanel({ step, guideLink }: { step: AdoptionStep; guideLink: string }) {
    return (
        <div
            role="tabpanel"
            id={`adoption-panel-${step.id}`}
            aria-labelledby={`adoption-tab-${step.id}`}
            className="flex h-full flex-col"
        >
            <span className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{step.eyebrow}</span>
            <h3 className="mt-[1rem] text-[3rem] font-semibold leading-[1.08] tracking-[-0.02em]">{step.title}</h3>
            <p className="mt-[1.4rem] max-w-[40rem] text-[1.6rem] leading-[1.55] text-[var(--adaptive-text-secondary)]">{step.description}</p>
            {step.note ? <p className="mt-[1rem] max-w-[40rem] whitespace-pre-line text-[1.45rem] leading-[1.5] text-[var(--adaptive-text-muted)]">{step.note}</p> : null}

            <ul className="mt-[2.8rem] flex-1 divide-y divide-[var(--adaptive-border)] border-y border-[var(--adaptive-border)]">
                {step.highlights.map((highlight) => (
                    <li
                        className="py-[1.8rem]"
                        key={highlight.title}
                    >
                        <strong className="block text-[1.8rem] font-semibold leading-[1]">{highlight.title}</strong>
                        <p className="mt-[0.6rem] text-[1.45rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">{highlight.detail}</p>
                    </li>
                ))}
            </ul>

            {step.showGuideLink ? (
                <Link
                    className="mt-[2.4rem] inline-flex w-fit items-center gap-[0.8rem] border border-[var(--adaptive-border)] px-[1.4rem] py-[1rem] font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--adaptive-text-secondary)] transition-colors hover:border-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]"
                    href="/docs/setup"
                >
                    {guideLink}
                    <MaterialIcon
                        name="arrow_forward"
                        size={16}
                    />
                </Link>
            ) : null}
        </div>
    );
}

export function DeveloperReliefSection() {
    const { developerRelief } = useMessages().fivepixels;
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const activeStep = developerRelief.steps[activeStepIndex];

    return (
        <section
            className="w-full"
            id="developers"
        >
            <div className="mx-auto w-full max-w-[var(--size-pc)] overflow-hidden border-x border-x-[var(--adaptive-border)]">
                <div className="grid tablet:grid-cols-2">
                    <div className="border-b border-b-[var(--adaptive-border)] bg-[var(--fp-bg)] p-[2.4rem] tablet:border-b-0 tablet:border-r tablet:p-[4.8rem]">
                        <FadePanel
                            panelKey={activeStep.id}
                            prefersReducedMotion={!!prefersReducedMotion}
                        >
                            <DescriptionPanel
                                step={activeStep}
                                guideLink={developerRelief.guideLink}
                            />
                        </FadePanel>
                    </div>

                    <div className="flex flex-col bg-[var(--fp-bg)]">
                        <div
                            className="grid grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-3"
                            role="tablist"
                            aria-label={developerRelief.tabAriaLabel}
                        >
                            {developerRelief.steps.map((step, index) => {
                                const isActive = activeStepIndex === index;

                                return (
                                    <button
                                        key={step.id}
                                        type="button"
                                        role="tab"
                                        id={`adoption-tab-${step.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`adoption-panel-${step.id}`}
                                        className={[
                                            "px-[1.6rem] py-[1.4rem] text-left font-[family-name:var(--font-manrope)] text-[1.4rem] transition-colors tablet:px-[1.8rem] tablet:py-[1.6rem] tablet:text-[1.6rem]",
                                            isActive
                                                ? "bg-[#F6572E] text-white"
                                                : "bg-transparent text-[var(--fp-text-description)] hover:bg-[var(--adaptive-greyOpacity100)] hover:text-[var(--fp-text-emphasis)]",
                                        ].join(" ")}
                                        onClick={() => setActiveStepIndex(index)}
                                    >
                                        {step.tabLabel}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative flex flex-1 flex-col">
                            <FadePanel
                                panelKey={activeStep.id}
                                prefersReducedMotion={!!prefersReducedMotion}
                                className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-1 items-center justify-center w-full h-full p-[1.6rem]"
                            >
                                <section className="border border-white p-[0.4rem] rounded-[0.8rem]">
                                    <TailwindSyntaxCode code={activeStep.code} />
                                </section>
                            </FadePanel>
                            <video
                                autoPlay
                                className="h-full min-h-[32rem] w-full object-cover"
                                loop
                                muted
                                playsInline
                                aria-hidden
                            >
                                <source
                                    src="/colorflow-animation-2.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
