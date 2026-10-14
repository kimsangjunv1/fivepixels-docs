"use client";

import { useState } from "react";
import { useMessages } from "@/shared/i18n/useMessages";

export function FAQSection() {
    const faqs = useMessages().fivepixels.faq;
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section
            className="w-full px-[1.2rem] tablet:px-[2.4rem]"
            id="faq"
        >
            <div className="mx-auto flex w-full max-w-[var(--size-pc)] flex-col border-x border-x-[var(--adaptive-border)]">
                <div className="border-t border-t-[var(--adaptive-border)]">
                    {faqs.map((faq, index) => (
                        <article
                            className="border-b border-b-[var(--adaptive-border)] bg-[var(--adaptive-surface)]"
                            key={faq.question}
                        >
                            <button
                                type="button"
                                className="grid w-full gap-[1.6rem] px-[2rem] py-[2.2rem] text-left tablet:grid-cols-[8rem_minmax(0,1fr)_4rem] tablet:items-start tablet:px-[5.2rem] tablet:py-[2.8rem]"
                                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-panel-${index}`}
                            >
                                <span className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--adaptive-text-muted)] tablet:pt-[0.4rem]">0{index + 1}</span>
                                <span className="text-[2rem] font-semibold leading-[1.2] tracking-[-0.02em] tablet:text-[2.4rem] tablet:leading-[1.3]">{faq.question}</span>
                                <span
                                    className="justify-self-end text-[2.6rem] leading-none text-[var(--adaptive-text-muted)] transition-transform duration-300"
                                    aria-hidden="true"
                                >
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                id={`faq-panel-${index}`}
                                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-[2rem] pb-[2.4rem] tablet:grid tablet:grid-cols-[8rem_minmax(0,1fr)_4rem] tablet:px-[5.2rem] tablet:pb-[3.2rem]">
                                        <div />
                                        <p className="max-w-[72rem] text-[1.6rem] leading-[1.3] text-[var(--adaptive-text-secondary)] tablet:pr-[3.2rem]">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
