"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { ListDemo } from "./ListDemo";
import { useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

export function IssuesHeading() {
    const issues = useMessages().example.issues;

    return (
        <header
            className="flex flex-col gap-[0.8rem]"
            data-report-id="example-issues-header"
            data-report-type="group"
        >
            <p className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{issues.eyebrow}</p>
            <h1
                className="text-[2.8rem] font-semibold"
                data-report-id="example-issues-title"
            >
                {issues.title}
            </h1>
            <p
                className="max-w-[64rem] text-[1.5rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-issues-description"
            >
                {issues.description}
            </p>
        </header>
    );
}

export function ModalActions() {
    const issues = useMessages().example.issues;
    const open = useModalLabStore((state) => state.open);

    return (
        <section
            className="grid gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem] mobile:grid-cols-1 tablet:grid-cols-2"
            data-report-id="example-issues-modal-triggers"
            data-report-type="group"
        >
            <button
                className="border border-[var(--adaptive-border)] px-[1.4rem] py-[1.2rem] text-left text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                data-report-id="example-issues-open-display-none"
                onClick={() => open("issues-display-none")}
                type="button"
            >
                {issues.openDetail}
            </button>
            <button
                className="border border-[var(--adaptive-border)] px-[1.4rem] py-[1.2rem] text-left text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                data-report-id="example-issues-open-scroll-x"
                onClick={() => open("issues-scroll-x")}
                type="button"
            >
                {issues.openModal}
            </button>
        </section>
    );
}

export function IssueList() {
    const open = useModalLabStore((state) => state.open);

    return (
        <ListDemo onReview={(rowId) => (rowId === "issue-02" ? open("issues-display-none") : open("issues-scroll-x"))} />
    );
}
