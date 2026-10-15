"use client";

import { ArrowRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "@/shared/i18n/useMessages";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";

const expandedText = "font-[family-name:var(--font-manrope)] font-semibold";

export function IntroSection() {
    const intro = useMessages().fivepixels.intro;

    return (
        <section
            className="mx-auto w-full h-[calc(50svh-(8.0rem/2))] max-w-[var(--size-pc)] border-x border-x-[var(--adaptive-border)] border-b border-b-[var(--adaptive-border)]"
            id="intro"
        >
            <section className="flex items-end gap-[2.4rem] h-full">
                <section className="flex-1 p-[5.2rem]">
                    {/* <WeightWaveText
                        as="h1"
                        className="text-[7.8rem] leading-[1.3] font-semibold"
                        lines={intro.headline}
                    /> */}
                    <h1 className="text-[7.8rem] leading-[1.2] font-semibold">{intro.headline}</h1>
                </section>

                <div className="h-full w-[0.1rem] bg-[var(--adaptive-border)]" />

                <section className="flex-1 p-[5.2rem]">
                    <section className="flex items-center gap-[0.8rem]">
                        <img
                            src="/sparkle.svg"
                            alt="/"
                            className="w-[1.4rem]"
                        />
                        <p className="text-[1.4rem]">{intro.announcement}</p>
                    </section>

                    <p className="max-w-[48rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                        {intro.bodyLine1}
                        <br />
                        <strong className={`${expandedText} inline-flex items-center text-[#ff4b2e]`}>
                            {intro.bodyHighlight} <MaterialIcon name="bolt" />
                        </strong>{" "}
                        {intro.bodyLine2}
                    </p>

                    <div className="flex flex-col gap-[2.4rem]">
                        <Link
                            className="flex w-max items-center gap-[1.6rem] rounded-[1.6rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[1.2rem_1.6rem] font-[family-name:var(--font-manrope)]"
                            href="/docs/setup#install"
                        >
                            npm i @fivepixels-js/react <div className="h-full w-[0.1rem] bg-[var(--adaptive-text-primary)]" />
                            <div className="h-[1.8rem] w-[0.1rem] bg-[var(--adaptive-border)]" />
                            <LinkIcon
                                size={15}
                                strokeWidth={2.4}
                            />
                        </Link>

                        <section className="flex gap-[0.8rem]">
                            <Link
                                className="flex w-max items-center gap-[1.6rem] rounded-[1.6rem] bg-[var(--adaptive-surface)] px-[1.6rem] py-[1.2rem] text-[var(--adaptive-text-primary)] shadow-[var(--shadow-popup)]"
                                href="/example/01"
                            >
                                {intro.demoCta} <ArrowRight size={17} />
                            </Link>

                            <Link
                                className="flex w-max items-center gap-[1.6rem] rounded-[1.6rem] bg-[var(--adaptive-surface)] px-[1.6rem] py-[1.2rem] text-[var(--adaptive-text-primary)] shadow-[var(--shadow-popup)]"
                                href="/docs/quickstart"
                            >
                                {intro.guideCta} <ArrowRight size={17} />
                            </Link>
                        </section>
                    </div>
                </section>
            </section>
        </section>
    );
}
