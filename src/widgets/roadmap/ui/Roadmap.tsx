import { CircleDot } from "lucide-react";

import { roadmapColumns } from "@/entities/content";

const columnAccent: Record<string, string> = {
    now: "text-[var(--adaptive-green600)]",
    next: "text-[var(--adaptive-blue600)]",
    later: "text-[var(--adaptive-text-muted)]",
};

export function RoadmapHeading() {
    return (
        <header className="grid gap-[2.4rem] border-b border-[var(--adaptive-border)] pb-[4.8rem] lg:grid-cols-12">
            <h1 className="text-[4.4rem] font-semibold tracking-[-0.055em] tablet:text-[6.4rem] lg:col-span-7">Roadmap</h1>
            <p className="max-w-[48rem] text-[1.7rem] leading-[1.7] text-[var(--adaptive-text-muted)] lg:col-span-5 lg:pt-[1.2rem]">
                A transparent view of what we are building. Later items describe direction, not a delivery commitment.
            </p>
        </header>
    );
}

export function RoadmapBoard() {
    return (
        <div className="mt-[5.6rem] grid gap-px overflow-hidden border border-[var(--adaptive-border)] bg-[var(--adaptive-border)] lg:grid-cols-3">
            {roadmapColumns.map((column) => (
                <section
                    className="bg-[var(--adaptive-surface)]"
                    key={column.id}
                >
                    <header className="border-b border-[var(--adaptive-border)] p-[2.4rem]">
                        <div className={`flex items-center gap-[0.8rem] ${columnAccent[column.id] ?? columnAccent.later}`}>
                            <CircleDot size={17} />
                            <h2 className="text-[1.8rem] font-semibold text-[var(--adaptive-text-primary)]">{column.label}</h2>
                        </div>
                        <p className="mt-[0.8rem] text-[1.3rem] leading-[1.55] text-[var(--adaptive-text-muted)]">{column.description}</p>
                    </header>
                    <div className="divide-y divide-[var(--adaptive-border)]">
                        {column.items.map((item) => (
                            <article
                                className="min-h-[21rem] p-[2.4rem]"
                                key={item.title}
                            >
                                <div className="flex items-center justify-between gap-[1rem] text-[1.05rem] uppercase tracking-[0.09em] text-[var(--adaptive-text-muted)]">
                                    <span>{item.area}</span>
                                    <span>{item.status}</span>
                                </div>
                                <h3 className="mt-[3.2rem] text-[2rem] font-semibold tracking-[-0.025em]">{item.title}</h3>
                                <p className="mt-[1.2rem] text-[1.4rem] leading-[1.7] text-[var(--adaptive-text-secondary)]">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
