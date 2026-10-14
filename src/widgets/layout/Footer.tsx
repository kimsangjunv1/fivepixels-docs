"use client";

import Image from "next/image";
import { useMessages } from "@/shared/i18n/useMessages";

export function Footer() {
    const { footer } = useMessages().layout;
    const { site } = footer;
    const [libraryLine1, libraryLine2] = site.libraries.split("\n");

    return (
        <section className="min-h-[375px] flex flex-col gap-[15.2rem] border-t border-t-[var(--adaptive-border)] bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]">
            <footer className="mx-auto grid w-[min(1920px,calc(100%-48px))] grid-cols-[1.15fr_1fr_.85fr] pt-[89px] max-[720px]:w-[min(calc(100%-32px),520px)] max-[720px]:grid-cols-2 max-[720px]:gap-x-5 max-[720px]:gap-y-[55px] max-[720px]:py-[55px] max-[720px]:pb-20">
                <div className="flex flex-col items-start leading-none">
                    <strong>{site.codi}</strong>
                    <span>{site.handle}</span>
                    <p className="mt-[34px] leading-[1.3]">
                        {site.developedBy}
                        <br />
                        {site.author}
                    </p>
                </div>

                <div>
                    <small className="my-[7px] mb-[14px] block text-[18px]">{site.currentLibrary}</small>
                    <strong className="block text-[26px] leading-[1.45]">
                        {libraryLine1}
                        <br />
                        {libraryLine2}
                    </strong>
                </div>

                <div>
                    <small className="my-[7px] mb-[14px] block text-[18px]">{site.currentLibrary}</small>
                    <div className="flex gap-2 text-[#bcbcbc]">
                        <span
                            className="grid h-[27px] w-[27px] place-items-center rounded-full bg-[#bcbcbc] font-extrabold text-black"
                            aria-label={site.githubAria}
                        >
                            GH
                        </span>
                        <span
                            className="grid h-[27px] w-[27px] place-items-center rounded-full bg-[#bcbcbc] font-extrabold text-black"
                            aria-label={site.linkedInAria}
                        >
                            in
                        </span>
                    </div>
                </div>
            </footer>

            <Image
                className="theme-adaptive-logo h-auto w-[min(1920px,calc(100%-48px))] mx-auto"
                src="/rebranding/logo-single-black.svg"
                alt={site.logoAlt}
                width={1558}
                height={284}
            />
        </section>
    );
}
