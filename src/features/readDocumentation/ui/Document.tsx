"use client";

import Link from "next/link";
import type { GuideBlock, GuideCollectionMessages, GuideHero, GuideSection } from "@/shared/i18n/guide/types";
import { RichText } from "@/shared/ui/rich-text";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { DocTable } from "./DocTable";
import { GuideStep } from "./GuideStep";
import { QuickStartHero } from "./QuickStartHero";
import { CopyBlock } from "./CopyBlock";
import { CustomSetupBuilder } from "./CustomSetupBuilder";
import { GuideTabs } from "./GuideTabs";

const expandedText = "font-[family-name:var(--font-manrope)] font-semibold tracking-[-0.025em]";

function renderBlocks(blocks: GuideBlock[]) {
    return blocks.map((block, index) => <BlockRenderer key={`${block.type}-${index}`} block={block} />);
}

function BlockRenderer({ block }: { block: GuideBlock }) {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="text-[1.6rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                    <RichText text={block.text} />
                </p>
            );
        case "list":
            return (
                <ul className="list-disc space-y-[0.8rem] pl-[2rem] text-[1.6rem] text-[var(--adaptive-text-secondary)] [&_li]:leading-[1.5]">
                    {block.items.map((item) => (
                        <li key={item}>
                            <RichText text={item} />
                        </li>
                    ))}
                </ul>
            );
        case "ordered":
            return (
                <ol className="list-decimal space-y-[0.8rem] pl-[2rem] text-[1.6rem] text-[var(--adaptive-text-secondary)] [&_li]:leading-[1.5]">
                    {block.items.map((item) => (
                        <li key={item}>
                            <RichText text={item} />
                        </li>
                    ))}
                </ol>
            );
        case "code":
            return (
                <CodeBlock
                    snippet={block.snippet}
                    language={block.language}
                />
            );
        case "codeRaw":
            return (
                <CodeBlock
                    code={block.code}
                    language={block.language}
                />
            );
        case "link":
            return (
                <Link
                    href={block.href}
                    className="inline-flex items-center gap-[0.8rem] text-[1.6rem] font-medium text-[var(--adaptive-accent-coral)] transition-colors hover:text-[var(--adaptive-accent-coral-hover)]"
                >
                    {block.label}
                    <span aria-hidden>→</span>
                </Link>
            );
        case "actions":
            return (
                <div className="grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
                    {block.links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex min-h-[8rem] items-center justify-between gap-[1.6rem] rounded-[0.6rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] px-[2rem] transition-[border-color,box-shadow] hover:border-[var(--adaptive-grey400)] hover:shadow-[var(--adaptive-popup-shadow)]"
                        >
                            <span>
                                <span className="block text-[1.5rem] font-medium text-[var(--adaptive-text-primary)]">{link.label}</span>
                                {link.description ? <span className="mt-[0.4rem] block text-[1.3rem] text-[var(--adaptive-text-muted)]">{link.description}</span> : null}
                            </span>
                            <span className="text-[1.6rem] text-[var(--adaptive-text-muted)] transition-colors group-hover:text-[var(--adaptive-accent-coral)]" aria-hidden>→</span>
                        </Link>
                    ))}
                </div>
            );
        case "callout":
            return <Callout text={block.text} variant={block.variant} />;
        case "table":
            return (
                <DocTable
                    headers={block.headers}
                    rows={block.rows}
                />
            );
        case "subheading":
            return (
                <h3
                    id={block.id}
                    className={`${expandedText} scroll-mt-[10.4rem] text-[2.2rem] text-[var(--adaptive-text-primary)]`}
                >
                    {block.text}
                </h3>
            );
        case "copy":
            return <CopyBlock label={block.label} text={block.text} />;
        case "customSetup":
            return <CustomSetupBuilder mode={block.mode} />;
        case "tabs":
            return <GuideTabs tabs={block.tabs} renderBlocks={renderBlocks} />;
        default:
            return null;
    }
}

function ReferenceSection({ section }: { section: GuideSection }) {
    return (
        <section
            id={section.id}
            className="scroll-mt-[7.2rem] border-b border-[var(--adaptive-border)] px-[3.2rem] py-[5.6rem] lg:px-[5.6rem] lg:py-[7.2rem]"
        >
            <h2 className={`${expandedText} text-[3rem] leading-[1.25] mobile:text-[2.4rem]`}>{section.title}</h2>
            <div className="mt-[3.2rem] flex flex-col gap-[2.4rem]">
                {section.blocks.map((block, i) => (
                    <BlockRenderer
                        key={`${section.id}-${i}`}
                        block={block}
                    />
                ))}
            </div>
        </section>
    );
}

export function Document({ collection, hero, sections }: { collection: GuideCollectionMessages; hero: GuideHero; sections: GuideSection[] }) {
    const quickStartSections = sections.filter((s) => s.variant === "quick-start");
    const referenceSections = sections.filter((s) => s.variant === "reference");

    return (
        <article className="mx-auto min-w-0 max-w-[88rem] flex-1 pb-[8rem]">
            <QuickStartHero collection={collection} hero={hero} />

            <div className="flex flex-col">
                {quickStartSections.map((section) => (
                    <GuideStep
                        key={section.id}
                        id={section.id}
                        stepLabel={section.stepLabel ?? ""}
                        title={section.title}
                    >
                        {section.blocks.map((block, i) => (
                            <BlockRenderer
                                key={`${section.id}-${i}`}
                                block={block}
                            />
                        ))}
                    </GuideStep>
                ))}
            </div>

            {referenceSections.length > 0 && (
                <div className="flex flex-col">
                    {referenceSections.map((section) => (
                        <ReferenceSection
                            key={section.id}
                            section={section}
                        />
                    ))}
                </div>
            )}
        </article>
    );
}
