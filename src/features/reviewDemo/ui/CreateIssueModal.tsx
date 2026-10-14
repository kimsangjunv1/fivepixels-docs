"use client";

import { useMessages } from "@/shared/i18n/useMessages";

type CreateIssueModalProps = {
    onClose: () => void;
};

const tagStyles = [
    "border border-[#f04452] px-[0.8rem] py-[0.4rem] text-[1.2rem] text-[#f04452]",
    "border border-[#2563eb] px-[0.8rem] py-[0.4rem] text-[1.2rem] text-[#2563eb]",
    "border border-[var(--adaptive-text-primary)] px-[0.8rem] py-[0.4rem] text-[1.2rem]",
] as const;

const tagReportIds = [
    "example-dashboard-modal-tag-bug",
    "example-dashboard-modal-tag-copy",
    "example-dashboard-modal-tag-important",
] as const;

export function CreateIssueModal({ onClose }: CreateIssueModalProps) {
    const createIssue = useMessages().example.createIssue;

    return (
        <div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-[1.6rem]"
            data-report-id="example-dashboard-modal-overlay"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="w-full max-w-[48rem] overflow-hidden border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] shadow-[var(--adaptive-popup-shadow)]"
                data-report-id="example-dashboard-modal-dialog"
                data-report-type="group"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="example-dashboard-modal-title"
            >
                <div
                    className="flex items-center justify-between bg-[#1e293b] px-[2rem] py-[1.4rem] text-white"
                    data-report-id="example-dashboard-modal-header"
                    data-report-type="group"
                >
                    <div>
                        <p
                            className="font-[family-name:var(--font-manrope)] text-[1.1rem] text-white/60"
                            data-report-id="example-dashboard-modal-eyebrow"
                        >
                            {createIssue.eyebrow}
                        </p>
                        <h2
                            className="text-[2rem] font-semibold"
                            data-report-id="example-dashboard-modal-title"
                            id="example-dashboard-modal-title"
                        >
                            {createIssue.title}
                        </h2>
                    </div>
                    <button
                        className="border border-white/30 px-[1rem] py-[0.6rem] text-[1.2rem]"
                        data-report-id="example-dashboard-modal-close"
                        onClick={onClose}
                        type="button"
                    >
                        {createIssue.close}
                    </button>
                </div>

                <div
                    className="flex flex-col gap-[1.6rem] p-[2rem]"
                    data-report-id="example-dashboard-modal-body"
                    data-report-type="group"
                >
                    <label
                        className="flex flex-col gap-[0.8rem] text-[1.4rem]"
                        data-report-id="example-dashboard-modal-title-field"
                    >
                        <span
                            className="font-medium"
                            data-report-id="example-dashboard-modal-title-label"
                        >
                            {createIssue.formTitle}
                        </span>
                        <input
                            className="border border-[var(--adaptive-border)] px-[1.2rem] py-[1rem] text-[1.4rem] outline-none focus:border-[var(--adaptive-text-primary)]"
                            data-report-id="example-dashboard-modal-title-input"
                            placeholder={createIssue.titlePlaceholder}
                            type="text"
                        />
                    </label>

                    <label
                        className="flex flex-col gap-[0.8rem] text-[1.4rem]"
                        data-report-id="example-dashboard-modal-message-field"
                    >
                        <span
                            className="font-medium"
                            data-report-id="example-dashboard-modal-message-label"
                        >
                            {createIssue.formDescription}
                        </span>
                        <textarea
                            className="min-h-[10rem] resize-y border border-[var(--adaptive-border)] p-[1.2rem] font-[family-name:var(--font-inter)] text-[1.4rem] outline-none focus:border-[var(--adaptive-text-primary)]"
                            data-report-id="example-dashboard-modal-textarea"
                            placeholder={createIssue.descriptionPlaceholder}
                        />
                    </label>

                    <div
                        className="flex flex-wrap gap-[0.8rem]"
                        data-report-id="example-dashboard-modal-tags"
                        data-report-type="group"
                    >
                        {createIssue.tags.map((tag, index) => (
                            <span
                                className={tagStyles[index]}
                                data-report-id={tagReportIds[index]}
                                key={tag}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div
                        className="flex gap-[1.2rem]"
                        data-report-id="example-dashboard-modal-actions"
                        data-report-type="group"
                    >
                        <button
                            className="bg-[#1e293b] px-[1.4rem] py-[1rem] text-[1.3rem] text-white"
                            data-report-id="example-dashboard-modal-submit"
                            type="button"
                        >
                            {createIssue.submit}
                        </button>
                        <button
                            className="border border-[var(--adaptive-text-primary)] px-[1.4rem] py-[1rem] text-[1.3rem]"
                            data-report-id="example-dashboard-modal-cancel"
                            onClick={onClose}
                            type="button"
                        >
                            {createIssue.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
