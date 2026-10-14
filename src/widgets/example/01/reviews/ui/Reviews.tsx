"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

const reviewIds = ["rev-01", "rev-02", "rev-03", "rev-04"] as const;

export function ReviewsHeading() {
    const reviews = useMessages().example.reviews;

    return (
        <header
            className="flex flex-col gap-[0.8rem]"
            data-report-id="example-reviews-header"
            data-report-type="group"
        >
            <p className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{reviews.eyebrow}</p>
            <h1
                className="text-[2.8rem] font-semibold"
                data-report-id="example-reviews-title"
            >
                {reviews.title}
            </h1>
            <p
                className="max-w-[64rem] text-[1.5rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-reviews-description"
            >
                {reviews.description}
            </p>
        </header>
    );
}

export function ReviewActions() {
    const reviews = useMessages().example.reviews;
    const open = useModalLabStore((state) => state.open);

    return (
        <section
            className="grid gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem] mobile:grid-cols-1 tablet:grid-cols-2"
            data-report-id="example-reviews-modal-triggers"
            data-report-type="group"
        >
            <button
                className="border border-[var(--adaptive-border)] px-[1.4rem] py-[1.2rem] text-left text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                data-report-id="example-reviews-open-opacity"
                onClick={() => open("reviews-opacity")}
                type="button"
            >
                {reviews.openModal}
            </button>
            <button
                className="border border-[var(--adaptive-border)] px-[1.4rem] py-[1.2rem] text-left text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                data-report-id="example-reviews-open-zustand"
                onClick={() => open("reviews-zustand")}
                type="button"
            >
                Open zustand sign-off modal
            </button>
        </section>
    );
}

export function ReviewQueue() {
    const reviews = useMessages().example.reviews;
    const open = useModalLabStore((state) => state.open);

    return (
        <ul
            className="flex flex-col gap-[1.2rem]"
            data-report-id="example-reviews-list"
            data-report-type="group"
        >
            {reviews.items.map((item, index) => {
                const id = reviewIds[index];

                return (
                    <li
                        className="flex flex-wrap items-center justify-between gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
                        data-report-id={`example-review-card-${id}`}
                        key={id}
                    >
                        <div>
                            <p
                                className="text-[1.6rem] font-semibold"
                                data-report-id={`example-review-title-${id}`}
                            >
                                {item.title}
                            </p>
                            <p
                                className="mt-[0.4rem] text-[1.3rem] text-[var(--adaptive-text-muted)]"
                                data-report-id={`example-review-meta-${id}`}
                            >
                                {item.author} · {item.status}
                            </p>
                        </div>
                        <div className="flex gap-[0.8rem]">
                            <button
                                className="border border-[var(--adaptive-border)] px-[1.2rem] py-[0.8rem] text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                                data-report-id={`example-review-request-${id}`}
                                onClick={() => open("reviews-opacity")}
                                type="button"
                            >
                                {reviews.requestChanges}
                            </button>
                            <button
                                className="bg-[#1e293b] px-[1.2rem] py-[0.8rem] text-[1.3rem] text-white"
                                data-report-id={`example-review-approve-${id}`}
                                onClick={() => open("reviews-zustand")}
                                type="button"
                            >
                                {reviews.approve}
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
