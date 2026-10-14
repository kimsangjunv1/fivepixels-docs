"use client";

import { useMessages } from "@/shared/i18n/useMessages";

const rowIds = ["issue-01", "issue-02", "issue-03", "issue-04", "issue-05"] as const;
const headerIds = ["issue", "status", "tag", "author", "action"] as const;

const statusStyles: Record<string, string> = {
    STAGED: "bg-[#3d3d3d] text-white",
    OPEN: "bg-[#F9572E] text-white",
    RESOLVED: "bg-[#111] text-white",
};

const tagStyles: Record<string, string> = {
    BUG: "border border-[#f04452] text-[#f04452]",
    IMPORTANT: "border border-[var(--adaptive-text-primary)] text-[var(--adaptive-text-primary)]",
};

export function ListDemo({ onReview }: { onReview?: (rowId: string) => void; }) {
    const listDemo = useMessages().example.listDemo;

    return (
        <div
            className="overflow-hidden border border-[var(--adaptive-border)]"
            data-report-id="example-list-panel"
            data-report-type="group"
        >
            <div
                className="flex items-center justify-between bg-[#2a2a2a] px-[2rem] py-[1.4rem] text-white"
                data-report-id="example-list-header"
                data-report-type="group"
            >
                <div>
                    <p
                        className="font-[family-name:var(--font-manrope)] text-[1.2rem] text-white/60"
                        data-report-id="example-list-eyebrow"
                    >
                        {listDemo.eyebrow}
                    </p>
                    <h2
                        className="text-[2rem] font-semibold"
                        data-report-id="example-list-title"
                    >
                        {listDemo.title}
                    </h2>
                </div>
                <button
                    className="border border-white/30 px-[1.2rem] py-[0.8rem] text-[1.3rem]"
                    data-report-id="example-list-filter"
                    type="button"
                >
                    {listDemo.filter}
                </button>
            </div>

            <div
                className="overflow-x-auto bg-[var(--adaptive-surface)]"
                data-report-id="example-list-table-wrap"
            >
                <table
                    className="w-full min-w-[64rem] border-collapse text-left text-[1.4rem]"
                    data-report-id="example-list-table"
                >
                    <thead
                        className="bg-[var(--adaptive-grey50)] text-[1.2rem] uppercase tracking-[0.04em] text-[var(--adaptive-text-muted)]"
                        data-report-id="example-list-thead"
                    >
                        <tr data-report-id="example-list-header-row">
                            {listDemo.headers.map((label, index) => {
                                const id = headerIds[index];

                                return (
                                    <th
                                        className="px-[2rem] py-[1.2rem] font-medium"
                                        data-report-id={`example-list-th-${id}`}
                                        key={id}
                                        scope="col"
                                    >
                                        {label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody data-report-id="example-list-tbody">
                        {listDemo.rows.map((row, index) => {
                            const id = rowIds[index];

                            return (
                                <tr
                                    className="border-t border-[var(--adaptive-border)] transition-colors hover:bg-[var(--adaptive-grey50)]"
                                    data-report-id={`example-list-row-${id}`}
                                    key={id}
                                >
                                    <td
                                        className="px-[2rem] py-[1.6rem] font-medium"
                                        data-report-id={`example-list-title-${id}`}
                                    >
                                        {row.issue}
                                    </td>
                                    <td
                                        className="px-[2rem] py-[1.6rem]"
                                        data-report-id={`example-list-status-cell-${id}`}
                                    >
                                        <span
                                            className={`inline-block px-[0.8rem] py-[0.3rem] text-[1.1rem] ${statusStyles[row.status]}`}
                                            data-report-id={`example-list-status-${id}`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                    <td
                                        className="px-[2rem] py-[1.6rem]"
                                        data-report-id={`example-list-tag-cell-${id}`}
                                    >
                                        <span
                                            className={`inline-block px-[0.8rem] py-[0.3rem] text-[1.1rem] ${tagStyles[row.tag]}`}
                                            data-report-id={`example-list-tag-${id}`}
                                        >
                                            {row.tag}
                                        </span>
                                    </td>
                                    <td
                                        className="px-[2rem] py-[1.6rem] text-[var(--adaptive-text-muted)]"
                                        data-report-id={`example-list-author-${id}`}
                                    >
                                        {row.author}
                                    </td>
                                    <td
                                        className="px-[2rem] py-[1.6rem]"
                                        data-report-id={`example-list-action-cell-${id}`}
                                    >
                                        <button
                                            className="border border-[var(--adaptive-text-primary)] px-[1rem] py-[0.6rem] text-[1.2rem] hover:bg-[var(--adaptive-surface-inverse)] hover:text-[var(--adaptive-text-inverse)]"
                                            data-report-id={`example-list-action-${id}`}
                                            onClick={() => onReview?.(id)}
                                            type="button"
                                        >
                                            {row.action}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
