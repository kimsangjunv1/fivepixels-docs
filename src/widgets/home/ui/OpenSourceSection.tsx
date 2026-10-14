"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useMessages } from "@/shared/i18n/useMessages";

export function OpenSourceSection() {
    const openSource = useMessages().fivepixels.openSource;

    return (
        <section
            className=""
            id="open-source"
        >
            <div className="mx-auto grid w-full max-w-[var(--size-pc)] grid-cols-2 border border-[var(--adaptive-border)]">
                <section className="flex flex-col gap-[1.6rem] p-[5.2rem]">
                    <h2 className="text-[2.4rem] font-bold">{openSource.title}</h2>

                    <p className="mb-[13px] leading-[1.45]">
                        {openSource.bodyLine1}
                        <br />
                        {openSource.bodyLine2}
                    </p>
                    <a
                        className="flex w-max items-center gap-[1.6rem] bg-[var(--adaptive-surface-inverse)] px-[1.6rem] py-[1.2rem] font-[family-name:var(--font-manrope)] text-[var(--adaptive-text-inverse)]"
                        href="#contribute"
                    >
                        {openSource.cta} <ArrowRight size={16} />
                    </a>
                </section>

                <section className="flex items-end justify-end max-[720px]:justify-start">
                    <div className="flex flex-col items-end pb-[5px] pr-[11px] leading-[.95]">
                        <strong>{openSource.broughtBy}</strong>
                        <span>{openSource.handle}</span>
                    </div>
                    <Image
                        className="h-[200px] w-[200px] object-cover"
                        src="/rebranding/post-profile.png"
                        alt={openSource.profileAlt}
                        width={512}
                        height={512}
                    />
                </section>
            </div>
        </section>
    );
}
