import React from "react";
import { cn } from "@/shared/lib/utils";

export function TitleSection({
    value,
    className = { text: { container: "bg-[var(--fp-bg)]" } },
    span = false,
    children,
}: {
    value?: string;
    className?: { container?: string; inner?: string; text?: { container?: string; value?: string } };
    span?: boolean;
    align?: "left" | "center" | "right";
    children?: React.ReactNode;
}) {
    return (
        <section className={cn("w-full border-b border-[var(--adaptive-border)] px-[1.2rem] tablet:px-[2.4rem]", className?.container)}>
            <div
                className={cn("mx-auto grid max-w-[var(--size-pc)] border-x border-[var(--adaptive-border)]", className?.inner)}
                style={{ gridTemplateColumns: `repeat(${span ? 1 : 2}, minmax(0, 1fr))` }}
            >
                <section className={cn(`${className?.text?.container} h-full px-[2rem] py-[3.2rem] tablet:px-[5.2rem] tablet:py-[4.2rem]`)}>
                    {value ? <h2 className={cn("text-[4.2rem] font-semibold leading-[1.3] whitespace-break-spaces text-[var(--fp-text-emphasis)]", className?.text?.value)}>{value}</h2> : null}
                    {children}
                </section>
                <div className="h-full w-[0.1rem] bg-[var(--adaptive-border)]" />
            </div>
        </section>
    );
}
