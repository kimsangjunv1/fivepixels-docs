"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { type ModalLabId, useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

function LabModalFrame({
    id,
    title,
    description,
    onClose,
    children,
    className,
    overlayClassName,
    alwaysMounted = false,
    open,
}: {
    id: ModalLabId;
    title: string;
    description: string;
    onClose: () => void;
    children: ReactNode;
    className?: string;
    overlayClassName?: string;
    alwaysMounted?: boolean;
    open: boolean;
}) {
    if (!alwaysMounted && !open) {
        return null;
    }

    return (
        <div
            className={cn(
                "fixed inset-0 z-[92] flex items-center justify-center bg-black/55 p-[1.6rem]",
                !open && alwaysMounted && "pointer-events-none opacity-0",
                overlayClassName,
            )}
            data-report-id={`example-modal-lab-overlay-${id}`}
            onClick={open ? onClose : undefined}
            role="presentation"
            aria-hidden={!open}
        >
            <div
                className={cn(
                    "w-full max-w-[52rem] overflow-hidden border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] shadow-[var(--adaptive-popup-shadow)]",
                    className,
                )}
                data-report-id={`example-modal-lab-dialog-${id}`}
                data-report-type="group"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal={open}
                aria-labelledby={`example-modal-lab-title-${id}`}
            >
                <div className="flex items-start justify-between gap-[1.2rem] border-b border-[var(--adaptive-border)] bg-[#1e293b] px-[2rem] py-[1.4rem] text-white">
                    <div>
                        <p className="font-[family-name:var(--font-manrope)] text-[1.1rem] text-white/60">{id}</p>
                        <h2
                            className="text-[2rem] font-semibold"
                            id={`example-modal-lab-title-${id}`}
                        >
                            {title}
                        </h2>
                        <p className="mt-[0.6rem] text-[1.3rem] text-white/70">{description}</p>
                    </div>
                    <button
                        className="shrink-0 border border-white/30 px-[1rem] py-[0.6rem] text-[1.2rem]"
                        data-report-id={`example-modal-lab-close-${id}`}
                        onClick={onClose}
                        type="button"
                    >
                        Close
                    </button>
                </div>
                <div
                    className="p-[2rem]"
                    data-report-id={`example-modal-lab-body-${id}`}
                    data-report-type="group"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

const wideColumns = Array.from({ length: 12 }, (_, index) => `Column ${index + 1}`);

const longParagraphs = Array.from({ length: 18 }, (_, index) => ({
    id: `paragraph-${index + 1}`,
    text: `Scroll test paragraph ${index + 1}. Nested containers, sticky headers, and modal overlays are common sources of marker drift.`,
}));

export function ModalLabModals() {
    const { isOpen, close } = useModalLabStore();

    return (
        <>
            {isOpen("zustand") || isOpen("reviews-zustand") ? (
                <LabModalFrame
                    description="This modal mounts and unmounts from a Zustand boolean."
                    id={isOpen("reviews-zustand") ? "reviews-zustand" : "zustand"}
                    onClose={() => close(isOpen("reviews-zustand") ? "reviews-zustand" : "zustand")}
                    open
                    title="Zustand boolean modal"
                >
                    <p className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]">
                        It renders in the DOM only while the global store&apos;s open state is true. Open it in Report mode and select an element inside.
                    </p>
                </LabModalFrame>
            ) : null}

            <LabModalFrame
                alwaysMounted
                description="Hidden using only opacity and pointer-events; it always remains in the DOM."
                id="opacity"
                onClose={() => close("opacity")}
                open={isOpen("opacity")}
                title="Opacity modal"
            >
                <p className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]">
                    The element stays in the DOM while closed, which is useful for marker and hit-testing scenarios.
                </p>
            </LabModalFrame>

            <LabModalFrame
                alwaysMounted
                description="An opacity case triggered from the Reviews page."
                id="reviews-opacity"
                onClose={() => close("reviews-opacity")}
                open={isOpen("reviews-opacity")}
                title="Reviews opacity modal"
            >
                <p className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]">
                    An opacity-based modal that simulates a review approval flow.
                </p>
            </LabModalFrame>

            {isOpen("display-none") ? (
                <LabModalFrame
                    description="Completely removed with a display: none (Tailwind hidden) toggle."
                    id="display-none"
                    onClose={() => close("display-none")}
                    open
                    title="Display none modal"
                >
                    <p className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]">
                        It exists in the DOM only while open. Check the differences in layout and the accessibility tree.
                    </p>
                </LabModalFrame>
            ) : null}

            {isOpen("issues-display-none") ? (
                <LabModalFrame
                    description="A display:none case opened from the Review button in the Issues table."
                    id="issues-display-none"
                    onClose={() => close("issues-display-none")}
                    open
                    title="Issues display none modal"
                >
                    <p className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]">
                        A display:none-based modal that simulates issue details.
                    </p>
                </LabModalFrame>
            ) : null}

            <div
                className={cn("fixed inset-0 z-[92] flex items-center justify-center bg-black/55 p-[1.6rem]", !isOpen("visibility-hidden") && "invisible")}
                data-report-id="example-modal-lab-overlay-visibility-hidden"
                onClick={() => close("visibility-hidden")}
                role="presentation"
                aria-hidden={!isOpen("visibility-hidden")}
            >
                <div
                    className="w-full max-w-[48rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem] shadow-[var(--adaptive-popup-shadow)]"
                    data-report-id="example-modal-lab-dialog-visibility-hidden"
                    data-report-type="group"
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    aria-modal={isOpen("visibility-hidden")}
                >
                    <h2 className="text-[2rem] font-semibold">Visibility hidden modal</h2>
                    <p className="mt-[1rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]">It may take up space while remaining invisible.</p>
                </div>
            </div>

            <div
                className={cn(
                    "fixed inset-0 z-[92] flex items-center justify-center bg-black/55 p-[1.6rem] transition-transform",
                    isOpen("transform-offscreen") ? "translate-y-0" : "pointer-events-none translate-y-[120%]",
                )}
                data-report-id="example-modal-lab-overlay-transform-offscreen"
                onClick={() => close("transform-offscreen")}
                role="presentation"
            >
                <div
                    className="w-full max-w-[48rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                    data-report-id="example-modal-lab-dialog-transform-offscreen"
                    data-report-type="group"
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    aria-modal={isOpen("transform-offscreen")}
                >
                    <h2 className="text-[2rem] font-semibold">Transform off-screen modal</h2>
                    <p className="mt-[1rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]">It moves off-screen with translate and then returns to its original position.</p>
                </div>
            </div>

            {isOpen("scroll-vertical") ? (
                <LabModalFrame
                    className="max-h-[min(80dvh,64rem)]"
                    description="Only the modal body scrolls vertically."
                    id="scroll-vertical"
                    onClose={() => close("scroll-vertical")}
                    open
                    title="Vertical scroll modal"
                >
                    <div className="max-h-[42rem] overflow-y-auto pr-[0.8rem]">
                        <div className="flex flex-col gap-[1.2rem]">
                            {longParagraphs.map((paragraph) => (
                                <p
                                    className="text-[1.4rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                                    data-report-id={`example-modal-lab-scroll-y-${paragraph.id}`}
                                    key={paragraph.id}
                                >
                                    {paragraph.text}
                                </p>
                            ))}
                        </div>
                    </div>
                </LabModalFrame>
            ) : null}

            {isOpen("scroll-horizontal") || isOpen("issues-scroll-x") ? (
                <LabModalFrame
                    className="max-w-[min(92vw,72rem)]"
                    description="The table inside the modal scrolls horizontally."
                    id={isOpen("issues-scroll-x") ? "issues-scroll-x" : "scroll-horizontal"}
                    onClose={() => close(isOpen("issues-scroll-x") ? "issues-scroll-x" : "scroll-horizontal")}
                    open
                    title="Horizontal scroll modal"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-[96rem] border-collapse text-left text-[1.4rem]">
                            <thead>
                                <tr className="bg-[var(--adaptive-grey50)]">
                                    {wideColumns.map((column) => (
                                        <th
                                            className="px-[1.6rem] py-[1rem]"
                                            key={column}
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 6 }, (_, rowIndex) => (
                                    <tr
                                        className="border-t border-[var(--adaptive-border)]"
                                        key={`row-${rowIndex}`}
                                    >
                                        {wideColumns.map((column) => (
                                            <td
                                                className="px-[1.6rem] py-[1.2rem]"
                                                data-report-id={`example-modal-lab-scroll-x-cell-${rowIndex}-${column}`}
                                                key={`${rowIndex}-${column}`}
                                            >
                                                Row {rowIndex + 1} · {column}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </LabModalFrame>
            ) : null}

            {isOpen("nested-scroll") ? (
                <div
                    className="fixed inset-0 z-[92] overflow-y-auto bg-black/55 p-[4rem]"
                    data-report-id="example-modal-lab-overlay-nested-scroll"
                    onClick={() => close("nested-scroll")}
                    role="presentation"
                >
                    <div
                        className="mx-auto min-h-[140vh] w-full max-w-[52rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                        data-report-id="example-modal-lab-dialog-nested-scroll"
                        data-report-type="group"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <h2 className="text-[2rem] font-semibold">Nested scroll modal</h2>
                        <p className="mt-[1rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]">
                            The overlay itself scrolls, reproducing a case where it competes with page scrolling.
                        </p>
                        <div className="mt-[2rem] flex flex-col gap-[1.2rem]">
                            {longParagraphs.map((paragraph) => (
                                <p
                                    className="text-[1.4rem] text-[var(--adaptive-text-muted)]"
                                    key={paragraph.id}
                                >
                                    {paragraph.text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            {isOpen("nested-stack") ? (
                <>
                    <LabModalFrame
                        description="First layer"
                        id="nested-stack"
                        onClose={() => {
                            close("nested-stack-2");
                            close("nested-stack");
                        }}
                        open
                        title="Nested modal (layer 1)"
                    >
                        <p className="text-[1.4rem] text-[var(--adaptive-text-secondary)]">Use the button below to open a second modal.</p>
                        <button
                            className="mt-[1.6rem] bg-[#1e293b] px-[1.4rem] py-[1rem] text-[1.3rem] text-white"
                            data-report-id="example-modal-lab-open-nested-stack-2"
                            onClick={() => useModalLabStore.getState().open("nested-stack-2")}
                            type="button"
                        >
                            Open layer 2
                        </button>
                    </LabModalFrame>
                    {isOpen("nested-stack-2") ? (
                        <div
                            className="fixed inset-0 z-[96] flex items-center justify-center bg-black/65 p-[1.6rem]"
                            data-report-id="example-modal-lab-overlay-nested-stack-2"
                            role="presentation"
                        >
                            <div
                                className="w-full max-w-[40rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                                data-report-id="example-modal-lab-dialog-nested-stack-2"
                                data-report-type="group"
                                role="dialog"
                                aria-modal="true"
                            >
                                <h3 className="text-[1.8rem] font-semibold">Nested modal (layer 2)</h3>
                                <button
                                    className="mt-[1.6rem] border border-[var(--adaptive-text-primary)] px-[1.2rem] py-[0.8rem] text-[1.3rem]"
                                    data-report-id="example-modal-lab-close-nested-stack-2"
                                    onClick={() => close("nested-stack-2")}
                                    type="button"
                                >
                                    Close layer 2
                                </button>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : null}
        </>
    );
}
