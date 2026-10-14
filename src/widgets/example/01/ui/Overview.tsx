"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

const statMeta = [
    { id: "open", value: "24", tone: "text-[#F9572E]" },
    { id: "staged", value: "11", tone: "text-[#2563eb]" },
    { id: "resolved", value: "38", tone: "text-[#16a34a]" },
] as const;

const kanbanMeta = [
    {
        id: "todo",
        cards: [
            { id: "card-01", assignee: "Kim" },
            { id: "card-02", assignee: "Lee" },
            { id: "card-03", assignee: "Park" },
        ],
    },
    {
        id: "review",
        cards: [
            { id: "card-04", assignee: "Choi" },
            { id: "card-05", assignee: "Jung" },
        ],
    },
    {
        id: "done",
        cards: [
            { id: "card-06", assignee: "Han" },
            { id: "card-07", assignee: "Yoon" },
        ],
    },
] as const;

const tagStyles: Record<string, string> = {
    BUG: "border border-[#f04452] text-[#f04452]",
    COPY: "border border-[#2563eb] text-[#2563eb]",
    A11Y: "border border-[#7c3aed] text-[#7c3aed]",
    UI: "border border-[var(--adaptive-text-primary)] text-[var(--adaptive-text-primary)]",
};

export function WorkspaceSummary() {
    const overview = useMessages().example.overview;

    return (
        <section
            className="grid mobile:grid-cols-1 tablet:grid-cols-3"
            data-report-id="example-dashboard-stats"
            data-report-type="group"
        >
            {statMeta.map((stat, index) => {
                const { label, delta } = overview.stats[index];

                return (
                    <article
                        className="flex flex-col gap-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                        data-report-id={`example-stat-card-${stat.id}`}
                        key={stat.id}
                    >
                        <p
                            className="text-[1.3rem] text-[var(--adaptive-text-muted)]"
                            data-report-id={`example-stat-label-${stat.id}`}
                        >
                            {label}
                        </p>
                        <p
                            className="text-[3.2rem] font-semibold leading-none"
                            data-report-id={`example-stat-value-${stat.id}`}
                        >
                            {stat.value}
                        </p>
                        <p
                            className={`text-[1.2rem] ${stat.tone}`}
                            data-report-id={`example-stat-delta-${stat.id}`}
                        >
                            {delta}
                        </p>
                    </article>
                );
            })}
        </section>
    );
}

export function IssueBoard() {
    const overview = useMessages().example.overview;
    const openModal = useModalLabStore((state) => state.open);

    return (
        <section
            className="grid mobile:grid-cols-1 gap-[1.6rem] tablet:grid-cols-3"
            data-report-id="example-dashboard-kanban"
            data-report-type="group"
        >
            {kanbanMeta.map((column, columnIndex) => {
                const kanbanColumn = overview.kanban[columnIndex];

                return (
                    <div
                        className="flex flex-col gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[1.6rem]"
                        data-report-id={`example-kanban-column-${column.id}`}
                        data-report-type="group"
                        key={column.id}
                    >
                        <div className="flex items-center justify-between">
                            <h3
                                className="text-[1.5rem] font-semibold"
                                data-report-id={`example-kanban-title-${column.id}`}
                            >
                                {kanbanColumn.column}
                            </h3>
                            <span
                                className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]"
                                data-report-id={`example-kanban-count-${column.id}`}
                            >
                                {kanbanColumn.cards.length}
                            </span>
                        </div>

                        <ul className="flex flex-col gap-[0.8rem]">
                            {column.cards.map((card, cardIndex) => {
                                const kanbanCard = kanbanColumn.cards[cardIndex];

                                return (
                                    <li key={card.id}>
                                        <button
                                            className="w-full border border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] p-[1.2rem] text-left transition-colors hover:border-[var(--adaptive-grey400)] hover:bg-[var(--adaptive-surface)]"
                                            data-report-id={`example-kanban-card-${card.id}`}
                                            onClick={() => openModal("zustand")}
                                            type="button"
                                        >
                                            <p
                                                className="text-[1.4rem] font-medium"
                                                data-report-id={`example-kanban-card-title-${card.id}`}
                                            >
                                                {kanbanCard.title}
                                            </p>
                                            <div className="mt-[1rem] flex items-center justify-between">
                                                <span
                                                    className={`inline-block px-[0.6rem] py-[0.2rem] text-[1.1rem] ${tagStyles[kanbanCard.tag]}`}
                                                    data-report-id={`example-kanban-card-tag-${card.id}`}
                                                >
                                                    {kanbanCard.tag}
                                                </span>
                                                <span
                                                    className="text-[1.2rem] text-[var(--adaptive-text-muted)]"
                                                    data-report-id={`example-kanban-card-assignee-${card.id}`}
                                                >
                                                    {card.assignee}
                                                </span>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </section>
    );
}

export function RecentActivity() {
    const overview = useMessages().example.overview;

    return (
        <section
            className="border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
            data-report-id="example-activity-panel"
            data-report-type="group"
        >
            <h3
                className="mb-[1.6rem] text-[1.6rem] font-semibold"
                data-report-id="example-activity-title"
            >
                {overview.activityTitle}
            </h3>
            <ul className="flex flex-col gap-[1.2rem]">
                {overview.activities.map((activity, index) => (
                    <li
                        className="flex items-start justify-between gap-[1.2rem] border-b border-[var(--adaptive-border)] pb-[1.2rem] last:border-0 last:pb-0"
                        data-report-id={`example-activity-item-act-${String(index + 1).padStart(2, "0")}`}
                        key={activity}
                    >
                        <p
                            className="text-[1.4rem] leading-[1.5]"
                            data-report-id={`example-activity-text-act-${String(index + 1).padStart(2, "0")}`}
                        >
                            {activity}
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
