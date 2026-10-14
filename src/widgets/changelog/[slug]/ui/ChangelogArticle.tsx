import { formatContentDate } from "@/shared/lib/formatContentDate";
import { ArrowLeft, Copy } from "lucide-react";
import Link from "next/link";
import { changelogTypeLabels } from "@/entities/content";

import { ContentSections } from "@/features/readContent/ui/ContentSections";
import { ChangelogTypeBadge } from "@/entities/content/ui/ChangelogTypeBadge";
import type { ChangelogEntry } from "@/entities/content";

export function BackLink() {
    return (
        <Link
            className="inline-flex items-center gap-[0.7rem] text-[1.3rem] text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]"
            href="/changelog"
        >
            <ArrowLeft size={15} />
            Changelog
        </Link>
    );
}

export function ChangeSummary({ entry }: { entry: ChangelogEntry; }) {
    return (
        <><div className="flex flex-wrap items-center gap-[1rem]">
            <time className="text-[1.25rem] text-[var(--adaptive-text-muted)]" dateTime={entry.date}>
                {formatContentDate(entry.date)}
            </time>
            <ChangelogTypeBadge type={entry.changeType} />
        </div>
            <h1 className="mt-[2.4rem] text-[4rem] font-semibold leading-[1.08] tracking-[-0.055em] tablet:text-[5.6rem]">{entry.title}</h1>
            <p className="mt-[2.4rem] border-b border-[var(--adaptive-border)] pb-[4rem] text-[2rem] leading-[1.65] text-[var(--adaptive-text-secondary)]">{entry.summary}</p></>
    );
}

export function ChangeBody({ entry }: { entry: ChangelogEntry; }) {
    return (
        <div className="pt-[4rem]">
            <ContentSections sections={entry.sections} />
        </div>
    );
}

export function ChangeMetadata({ entry }: { entry: ChangelogEntry; }) {
    return (
        <aside className="self-start border-t border-[var(--adaptive-border)] lg:sticky lg:top-[12rem] lg:col-span-4">
            <dl>
                <div className="border-b border-[var(--adaptive-border)] py-[1.8rem]">
                    <dt className="text-[1.1rem] uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">Change type</dt>
                    <dd className="mt-[0.8rem] text-[1.45rem]">{changelogTypeLabels[entry.changeType]}</dd>
                </div>
                <div className="border-b border-[var(--adaptive-border)] py-[1.8rem]">
                    <dt className="text-[1.1rem] uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">Products</dt>
                    <dd className="mt-[0.8rem] flex flex-wrap gap-[0.6rem] text-[1.45rem]">{entry.products.join(", ")}</dd>
                </div>
                <div className="border-b border-[var(--adaptive-border)] py-[1.8rem]">
                    <dt className="text-[1.1rem] uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">Product stage</dt>
                    <dd className="mt-[0.8rem] text-[1.45rem]">{entry.stage}</dd>
                </div>
                <div className="border-b border-[var(--adaptive-border)] py-[1.8rem]">
                    <dt className="text-[1.1rem] uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">Self-hosted</dt>
                    <dd className="mt-[0.8rem] text-[1.45rem]">{entry.selfHosted ? "Affected" : "Not affected"}</dd>
                </div>
            </dl>
            <Link
                className="mt-[1.8rem] inline-flex items-center gap-[0.7rem] text-[1.25rem] text-[var(--adaptive-text-muted)] hover:text-[var(--adaptive-text-primary)]"
                href="/changelog.md"
            >
                <Copy size={14} />
                View as Markdown
            </Link>
        </aside>
    );
}
