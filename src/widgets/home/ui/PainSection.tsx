"use client";

import { useMessages } from "@/shared/i18n/useMessages";

export function PainSection() {
    const pain = useMessages().fivepixels.pain;

    return (
        <section
            className="w-full px-[1.2rem] tablet:px-[2.4rem]"
            id="pain"
        >
            <div className="mx-auto grid w-full max-w-[var(--size-pc)] tablet:grid-cols-2">
                <div className="flex flex-col justify-between bg-[var(--fp-bg)] text-[var(--fp-text-emphasis)]">
                    <div className="max-w-[50%] p-[52px]">
                        <span className="font-[family-name:var(--font-manrope)] text-[1.4rem] text-[var(--fp-text-description)]">{pain.eyebrow}</span>
                        <h2 className="mt-[1.6rem] text-[4.2rem] font-semibold leading-[1.3]">
                            {pain.titleLine1}
                            <br />
                            {pain.titleLine2}
                        </h2>
                        <p className="mt-[2rem] max-w-[42rem] text-[1.7rem] leading-[1.55] text-[var(--fp-text-description)]">
                            {pain.bodyLine1}
                            <br />
                            {pain.bodyLine2}
                        </p>
                    </div>

                    <svg
                        className="h-[100%] w-full"
                        viewBox="0 0 540 140"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient
                                id="pain-chart-fill"
                                x1="0%"
                                x2="0%"
                                y1="0%"
                                y2="100%"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="var(--fp-text-emphasis)"
                                    stopOpacity="0.22"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--fp-text-emphasis)"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                        </defs>

                        <path
                            d="M0 130 
                                Q90 120, 180 100 
                                Q270 75, 360 70 
                                Q430 66, 540 30
                                L540 140 L0 140 Z"
                            fill="url(#pain-chart-fill)"
                        />
                        <defs>
                            <linearGradient
                                id="pain-chart-stroke"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="var(--fp-bg)"
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--fp-text-emphasis)"
                                />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0 130 
                                Q90 120, 180 100 
                                Q270 75, 360 70 
                                Q430 66, 540 30"
                            fill="none"
                            stroke="url(#pain-chart-stroke)"
                            strokeWidth="3"
                        />
                    </svg>
                </div>

                <div className="grid gap-[1px] bg-[var(--adaptive-border)]">
                    {pain.cards.map((card) => (
                        <article
                            className="flex min-h-[22.95rem] flex-col justify-between bg-[var(--fp-bg)] p-[2.4rem] tablet:p-[3.2rem]"
                            key={card.title}
                        >
                            <span className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--fp-text-description)]">{card.eyebrow}</span>
                            <div>
                                <h3 className="text-[2.8rem] font-semibold leading-[1] text-[var(--fp-text-emphasis)]">{card.title}</h3>
                                <p className="mt-[1.2rem] text-[1.6rem] leading-[1.3] text-[var(--fp-text-description)]">{card.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
