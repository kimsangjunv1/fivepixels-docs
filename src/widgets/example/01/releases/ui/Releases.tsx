"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { useModalLabStore } from "@/features/reviewDemo/model/useModalLabStore";

const releaseDates = ["Jun 12, 2026", "May 28, 2026", "May 10, 2026", "Apr 22, 2026"] as const;
const releaseIds = ["rel-01", "rel-02", "rel-03", "rel-04"] as const;

export function ReleasesHeading() {
    const releases = useMessages().example.releases;

    return (
        <header
            className="flex flex-col gap-[0.8rem]"
            data-report-id="example-releases-header"
            data-report-type="group"
        >
            <p className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{releases.eyebrow}</p>
            <h1
                className="text-[2.8rem] font-semibold"
                data-report-id="example-releases-title"
            >
                {releases.title}
            </h1>
            <p
                className="max-w-[64rem] text-[1.5rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-releases-description"
            >
                {releases.description}
            </p>
        </header>
    );
}

export function ReleaseList() {
    const releases = useMessages().example.releases;
    const open = useModalLabStore((state) => state.open);

    return (
        <ul
            className="flex flex-col gap-[1.2rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
            data-report-id="example-release-notes"
            data-report-type="group"
        >
            {releases.items.map((note, index) => {
                const id = releaseIds[index];
                const date = releaseDates[index];

                return (
                    <li
                        className="flex flex-wrap items-start justify-between gap-[1.6rem] border-b border-[var(--adaptive-border)] pb-[1.2rem] last:border-0 last:pb-0"
                        data-report-id={`example-release-note-${id}`}
                        key={id}
                    >
                        <div>
                            <p
                                className="text-[1.4rem] font-semibold"
                                data-report-id={`example-release-version-${id}`}
                            >
                                {note.version}
                            </p>
                            <p
                                className="mt-[0.4rem] text-[1.4rem] text-[var(--adaptive-text-secondary)]"
                                data-report-id={`example-release-summary-${id}`}
                            >
                                {note.summary}
                            </p>
                            <p
                                className="mt-[0.4rem] text-[1.2rem] text-[var(--adaptive-text-muted)]"
                                data-report-id={`example-release-date-${id}`}
                            >
                                {date}
                            </p>
                        </div>
                        <button
                            className="shrink-0 border border-[var(--adaptive-border)] px-[1rem] py-[0.6rem] text-[1.2rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                            data-report-id={`example-release-open-${id}`}
                            onClick={() => open("scroll-vertical")}
                            type="button"
                        >
                            {releases.viewChangelog}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
