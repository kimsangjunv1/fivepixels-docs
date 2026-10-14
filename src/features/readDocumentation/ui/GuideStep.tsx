import type { ReactNode } from "react";

const expandedText = "font-[family-name:var(--font-manrope)] font-semibold tracking-[-0.025em]";

export function GuideStep({
    id,
    stepLabel,
    title,
    children,
}: {
    id: string;
    stepLabel: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            className="scroll-mt-[7.2rem] border-b border-[var(--adaptive-border)] px-[3.2rem] py-[5.6rem] lg:px-[5.6rem] lg:py-[7.2rem]"
        >
            {stepLabel ? <span className="text-[1.2rem] font-medium uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">{stepLabel}</span> : null}
            <h2 className={`${expandedText} mt-[1.2rem] text-[3rem] leading-[1.25] mobile:text-[2.4rem]`}>{title}</h2>
            <div className="mt-[3.2rem] flex flex-col gap-[2.4rem]">{children}</div>
        </section>
    );
}
