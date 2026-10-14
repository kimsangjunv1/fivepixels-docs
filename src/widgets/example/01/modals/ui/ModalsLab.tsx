"use client";

import { useExample01ModalsProvider } from "../model/Example01ModalsContext";
import { useMessages } from "@/shared/i18n/useMessages";
import { cn } from "@/shared/lib/utils";
import { type ModalLabId, useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

const labCaseIds: ModalLabId[] = [
    "zustand",
    "opacity",
    "display-none",
    "visibility-hidden",
    "transform-offscreen",
    "scroll-vertical",
    "scroll-horizontal",
    "nested-scroll",
    "nested-stack",
    "inline-positioned",
];

export function ModalsHeading() {
    const modalsLab = useMessages().example.modalsLab;

    return (
        <header
            className="flex flex-col gap-[0.8rem]"
            data-report-id="example-modals-header"
            data-report-type="group"
        >
            <p className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{modalsLab.eyebrow}</p>
            <h1
                className="text-[2.8rem] font-semibold"
                data-report-id="example-modals-title"
            >
                {modalsLab.title}
            </h1>
            <p
                className="max-w-[72rem] text-[1.5rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-modals-description"
            >
                {modalsLab.description}
            </p>
        </header>
    );
}

export function ModalCases() {
    const modalsLab = useMessages().example.modalsLab;
    const open = useModalLabStore((state) => state.open);
    const { setInlineOpen } = useExample01ModalsProvider();

    return (
        <div
            className="grid gap-[1.2rem] mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3"
            data-report-id="example-modals-grid"
            data-report-type="group"
        >
            {labCaseIds.map((id, index) => {
                const item = modalsLab.cases[index];

                return (
                    <article
                        className="flex flex-col gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                        data-report-id={`example-modals-card-${id}`}
                        key={id}
                    >
                        <div>
                            <p
                                className="font-[family-name:var(--font-inter)] text-[1.1rem] text-[var(--adaptive-text-muted)]"
                                data-report-id={`example-modals-technique-${id}`}
                            >
                                {item.technique}
                            </p>
                            <h2
                                className="mt-[0.4rem] text-[1.6rem] font-semibold"
                                data-report-id={`example-modals-card-title-${id}`}
                            >
                                {item.title}
                            </h2>
                            <p
                                className="mt-[0.6rem] text-[1.3rem] leading-[1.5] text-[var(--adaptive-text-secondary)]"
                                data-report-id={`example-modals-card-desc-${id}`}
                            >
                                {item.description}
                            </p>
                        </div>
                        <button
                            className="mt-auto w-max border border-[var(--adaptive-text-primary)] px-[1.2rem] py-[0.8rem] text-[1.3rem] hover:bg-[var(--adaptive-surface-inverse)] hover:text-[var(--adaptive-text-inverse)]"
                            data-report-id={`example-modals-open-${id}`}
                            onClick={() => {
                                if (id === "inline-positioned") {
                                    setInlineOpen(true);
                                    return;
                                }

                                open(id);
                            }}
                            type="button"
                        >
                            {modalsLab.openModal}
                        </button>
                    </article>
                );
            })}
        </div>
    );
}

export function InlineModalHost() {
    const modalsLab = useMessages().example.modalsLab;
    const { inlineOpen, setInlineOpen } = useExample01ModalsProvider();

    return (
        <section
            className={cn("relative min-h-[28rem] overflow-hidden border border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] p-[2rem]", inlineOpen && "overflow-y-auto")}
            data-report-id="example-modals-inline-host"
            data-report-type="group"
        >
            <h3
                className="text-[1.6rem] font-semibold"
                data-report-id="example-modals-inline-title"
            >
                {modalsLab.hostTitle}
            </h3>
            <p
                className="mt-[0.8rem] max-w-[56rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-modals-inline-desc"
            >
                {modalsLab.hostDescription}
            </p>

            <div className="mt-[2rem] flex flex-col gap-[1rem]">
                {Array.from({ length: 8 }, (_, index) => (
                    <p
                        className="text-[1.3rem] text-[var(--adaptive-text-muted)]"
                        key={`filler-${index}`}
                    >
                        Scroll filler block {index + 1}
                    </p>
                ))}
            </div>

            {inlineOpen ? (
                <div
                    className="absolute inset-0 z-[10] flex items-center justify-center bg-black/45 p-[2rem]"
                    data-report-id="example-modal-lab-overlay-inline-positioned"
                    onClick={() => setInlineOpen(false)}
                    role="presentation"
                >
                    <div
                        className="w-full max-w-[40rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem] shadow-[var(--adaptive-popup-shadow)]"
                        data-report-id="example-modal-lab-dialog-inline-positioned"
                        data-report-type="group"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <h4 className="text-[1.8rem] font-semibold">{modalsLab.fillerTitle}</h4>
                        <p className="mt-[1rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]">{modalsLab.fillerDescription}</p>
                        <button
                            className="mt-[1.6rem] border border-[var(--adaptive-text-primary)] px-[1.2rem] py-[0.8rem] text-[1.3rem]"
                            data-report-id="example-modal-lab-close-inline-positioned"
                            onClick={() => setInlineOpen(false)}
                            type="button"
                        >
                            {modalsLab.close}
                        </button>
                    </div>
                </div>
            ) : null}
        </section>
    );
}
