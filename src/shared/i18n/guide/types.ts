import type { GuideSnippetKey } from "./snippets";

export type GuideTableCell =
    | string
    | { type: "anchors"; links: { href: string; label: string }[] };

export type GuideBlock =
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "ordered"; items: string[] }
    | { type: "code"; snippet: GuideSnippetKey; language?: string }
    | { type: "codeRaw"; code: string; language?: string }
    | { type: "callout"; variant: "info" | "warning"; text: string }
    | { type: "table"; headers: string[]; rows: GuideTableCell[][] }
    | { type: "subheading"; text: string; id?: string }
    | { type: "link"; href: string; label: string }
    | { type: "actions"; links: { href: string; label: string; description?: string }[] }
    | { type: "copy"; label: string; text: string }
    | { type: "customSetup"; mode: "local" | "api" }
    | { type: "tabs"; tabs: { label: string; blocks: GuideBlock[] }[] };

export type GuideSectionVariant = "quick-start" | "reference";

export type GuideSection = {
    id: string;
    title: string;
    stepLabel?: string;
    variant?: GuideSectionVariant;
    blocks: GuideBlock[];
};

export type GuideHero = {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    ctaHref?: string;
    installCommand?: string;
};

export type GuidePageMessages = {
    slug: string;
    title: string;
    description: string;
    hero: GuideHero;
    sections: GuideSection[];
};

export type GuideNavGroup = {
    label: string;
    items: { slug: string; label: string }[];
};

export type GuideCollectionMessages = {
    title: string;
    description: string;
    basePath: "/guides" | "/docs";
    navHome: string;
    codeCopy: string;
    codeCopied: string;
    onThisPage: string;
    navGroups: GuideNavGroup[];
    pages: Record<string, GuidePageMessages>;
};
