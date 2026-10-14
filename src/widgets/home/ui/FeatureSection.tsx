"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";

export function FeatureSection() {
    const features = useMessages().fivepixels.features;

    return (
        <section
            className="w-full px-[1.2rem] tablet:px-[2.4rem]"
            id="setup"
        >
            <div className="mx-auto grid w-full max-w-[var(--size-pc)] gap-[0.1rem] border-x border-x-[var(--adaptive-border)] border-b border-b-[var(--adaptive-border)] bg-[var(--adaptive-border)] mobile:grid-cols-1 tablet:grid-cols-2 pc:grid-cols-4">
                {features.map((feature, index) => (
                    <li
                        className="flex flex-col justify-between gap-[1.6rem] rounded-[0.8rem] bg-[var(--adaptive-surface)] p-[2.4rem]"
                        key={feature.title}
                    >
                        <div className="flex items-center justify-between mb-[1.2rem]">
                            <div className="flex items-center gap-[0.6rem]">
                                <MaterialIcon
                                    name={feature.icon}
                                    size={26}
                                    className="text-primary"
                                />
                                <span className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[0.4rem]">
                            <strong className="block font-semibold text-[1.8rem] mb-[0.2rem]">{feature.title}</strong>
                            <p className="text-[1.4rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">{feature.description}</p>
                        </div>
                    </li>
                ))}
            </div>
        </section>
    );
}
