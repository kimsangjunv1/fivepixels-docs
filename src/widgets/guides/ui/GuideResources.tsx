import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Braces, Check, ChevronRight, Clipboard, Copy, MousePointer2, Sparkles } from "lucide-react";
import type { GuideCollectionMessages, GuideNavGroup } from "@/shared/i18n/guide/types";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";

const guideIcons: Record<string, string> = {
    quickstart: "bolt",
    rollout: "calendar_month",
    rules: "rule",
    client: "send",
    workflow: "account_tree",
    roles: "groups",
    faq: "help",
    "dom-tagging": "ads_click",
    setup: "download",
    "dom-attributes": "data_object",
    modes: "toggle_on",
    "ui-edit": "edit",
    persistence: "database",
    "auth-and-team": "group",
    github: "merge",
    "panel-and-tabs": "dock_to_right",
    "mentions-and-thread": "forum",
    "import-export": "sd_storage",
    "custom-ui": "code",
    api: "api",
    "edge-cases": "warning",
};

function PromptCard() {
    return (
        <div className="overflow-hidden rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] shadow-[var(--adaptive-popup-shadow)]">
            <div className="flex h-[4.8rem] items-center justify-between border-b border-[var(--adaptive-border)] px-[1.6rem]">
                <div className="flex items-center gap-[0.8rem] text-[1.3rem] font-medium text-[var(--adaptive-text-primary)]">
                    <Sparkles
                        className="size-[1.5rem]"
                        strokeWidth={1.7}
                    />
                    <span>Tip</span>
                    <span className="text-[var(--adaptive-text-muted)]">›</span>
                    <span className="text-[var(--adaptive-text-muted)]">CLI</span>
                </div>
                <Copy
                    className="size-[1.5rem] text-[var(--adaptive-text-muted)]"
                    strokeWidth={1.6}
                />
            </div>
            <p className="p-[1.6rem] text-[1.35rem] leading-[1.5] text-[var(--adaptive-text-muted)]">
                Help me set up Fivepixels. Install the package, add the component once, and suggest the best next step for this team.
            </p>
        </div>
    );
}

function ReactLogo() {
    return (
        <svg
            viewBox="0 0 32 32"
            className="size-[2.8rem] text-[#61dafb]"
            aria-hidden
        >
            <circle
                cx="16"
                cy="16"
                r="2.5"
                fill="currentColor"
            />
            <ellipse
                cx="16"
                cy="16"
                rx="13"
                ry="5.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <ellipse
                cx="16"
                cy="16"
                rx="13"
                ry="5.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                transform="rotate(60 16 16)"
            />
            <ellipse
                cx="16"
                cy="16"
                rx="13"
                ry="5.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                transform="rotate(120 16 16)"
            />
        </svg>
    );
}

function NextLogo() {
    return (
        <span
            className="grid size-[2.8rem] place-items-center rounded-full bg-[var(--adaptive-surface-inverse)] font-[family-name:var(--font-manrope)] text-[1.5rem] font-semibold tracking-[-0.08em] text-[var(--adaptive-text-inverse)]"
            aria-hidden
        >
            N
        </span>
    );
}

function FrameworkLinks({ collection, group }: { collection: GuideCollectionMessages; group: GuideNavGroup; }) {
    return (
        <div className="grid grid-cols-1 gap-x-[4.8rem] gap-y-[2rem] sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
                <Link
                    key={item.slug}
                    href={`${collection.basePath}/${item.slug}`}
                    className="group flex min-h-[6.4rem] items-center gap-[1.6rem]"
                >
                    <span className="grid size-[5.6rem] shrink-0 place-items-center rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] transition-[border-color,box-shadow] group-hover:border-[var(--adaptive-grey400)] group-hover:shadow-[var(--adaptive-popup-shadow)]">
                        {item.slug === "react" ? <ReactLogo /> : <NextLogo />}
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] text-[1.6rem] font-semibold text-[var(--adaptive-text-primary)]">{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

function PersistenceLinks() {
    const modes = [
        {
            title: "localStorage",
            description: "Try Fivepixels in this browser. No backend needed.",
            href: "/docs/persistence#local-storage",
            icon: "database",
            badge: "Default",
        },
        {
            title: "API",
            description: "Save feedback through your backend and share it with your team.",
            href: "/docs/persistence#api",
            icon: "api",
            badge: "Team sync",
        },
        {
            title: "Artemis72",
            description: "A hosted service for teams. Currently in preparation.",
            href: "/docs/persistence#artemis72",
            icon: "rocket_launch",
            badge: "Coming soon",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-3">
            {modes.map((mode) => (
                <Link
                    key={mode.title}
                    href={mode.href}
                    className="group min-h-[16rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2.4rem] transition-[border-color,box-shadow] hover:border-[var(--adaptive-grey400)] hover:shadow-[var(--adaptive-popup-shadow)]"
                >
                    <span className="flex items-start justify-between gap-[1.2rem]">
                        <span className="grid size-[4.2rem] place-items-center rounded-[0.6rem] border border-[var(--adaptive-border)] text-[var(--adaptive-text-secondary)] transition-colors group-hover:text-[var(--adaptive-accent-coral)]">
                            <MaterialIcon
                                name={mode.icon}
                                size={18}
                            />
                        </span>
                        <span className="rounded-full bg-[var(--adaptive-grey100)] px-[1rem] py-[0.5rem] text-[1.1rem] font-medium text-[var(--adaptive-text-muted)]">{mode.badge}</span>
                    </span>
                    <span className="mt-[1.8rem] block font-[family-name:var(--font-manrope)] text-[1.5rem] font-semibold text-[var(--adaptive-text-primary)]">{mode.title}</span>
                    <p className="mt-[0.8rem] text-[1.3rem] leading-[1.5] text-[var(--adaptive-text-muted)]">{mode.description}</p>
                </Link>
            ))}
        </div>
    );
}

function CompactLinks({ collection, group }: { collection: GuideCollectionMessages; group: GuideNavGroup; }) {
    return (
        <div className="grid grid-cols-1 gap-x-[4.8rem] gap-y-[1.6rem] sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
                <Link
                    key={item.slug}
                    href={`${collection.basePath}/${item.slug}`}
                    className="group flex min-h-[4.8rem] items-center gap-[1.2rem]"
                >
                    <span className="grid size-[4.2rem] shrink-0 place-items-center rounded-[0.6rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] text-[var(--adaptive-text-secondary)] transition-colors group-hover:border-[var(--adaptive-grey400)] group-hover:text-[var(--adaptive-accent-coral)]">
                        <MaterialIcon
                            name={guideIcons[item.slug]}
                            size={18}
                        />
                    </span>
                    <span className="text-[1.4rem] font-medium text-[var(--adaptive-text-primary)]">{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

function GuideCards({ collection, group }: { collection: GuideCollectionMessages; group: GuideNavGroup; }) {
    return (
        <div className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2">
            {group.items.map((item) => {
                const page = collection.pages[item.slug];
                return (
                    <Link
                        key={item.slug}
                        href={`${collection.basePath}/${item.slug}`}
                        className="group min-h-[14.4rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2.4rem] transition-[border-color,box-shadow] hover:border-[var(--adaptive-grey400)] hover:shadow-[var(--adaptive-popup-shadow)]"
                    >
                        <span className="flex items-center gap-[1rem] font-[family-name:var(--font-manrope)] text-[1.5rem] font-semibold text-[var(--adaptive-text-primary)]">
                            <MaterialIcon
                                name={guideIcons[item.slug]}
                                className="text-[var(--adaptive-accent-coral)]"
                                size={17}
                            />
                            {item.label}
                        </span>
                        <p className="mt-[1.4rem] text-[1.35rem] leading-[1.5] text-[var(--adaptive-text-muted)]">{page?.description}</p>
                    </Link>
                );
            })}
        </div>
    );
}

function SelfHostLinks() {
    const items = [
        { label: "Auth", href: "/guides/self-hosting#auth", icon: "lock_open" },
        { label: "Realtime", href: "/guides/self-hosting#realtime", icon: "ads_click" },
        { label: "Storage", href: "/guides/self-hosting#storage", icon: "sd_storage" },
        { label: "Analytics", href: "/guides/self-hosting#analytics", icon: "layers" },
    ];

    return (
        <div className="grid grid-cols-1 gap-x-[8rem] gap-y-[2rem] sm:grid-cols-2">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-[5.6rem] items-center gap-[1.6rem]"
                >
                    <span className="grid size-[4.8rem] shrink-0 place-items-center rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] text-[var(--adaptive-text-secondary)] transition-colors group-hover:border-[var(--adaptive-grey400)] group-hover:text-[var(--adaptive-accent-coral)]">
                        <MaterialIcon
                            name={item.icon}
                            size={18}
                        />
                    </span>
                    <span className="font-[family-name:var(--font-manrope)] text-[1.6rem] font-semibold text-[var(--adaptive-text-primary)]">{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

function HomeSection({ title, description, cta, children }: { title: string; description: string; cta?: { href: string; label: string; }; children: ReactNode; }) {
    return (
        <section className="grid gap-[3.2rem] border-b border-[var(--adaptive-border)] px-[2.4rem] py-[5.6rem] lg:grid-cols-[28rem_minmax(0,1fr)] lg:px-[3.2rem] lg:py-[6.4rem]">
            <div>
                <h2 className="font-[family-name:var(--font-manrope)] text-[2rem] font-semibold tracking-[-0.025em] text-[var(--adaptive-text-primary)]">{title}</h2>
                <p className="mt-[1rem] max-w-[24rem] text-[1.4rem] leading-[1.5] text-[var(--adaptive-text-muted)]">{description}</p>
                {cta ? (
                    <Link
                        href={cta.href}
                        className="mt-[2rem] inline-flex items-center gap-[0.4rem] text-[1.4rem] font-medium text-[var(--adaptive-accent-coral)] transition-colors hover:text-[var(--adaptive-accent-coral-hover)]"
                    >
                        {cta.label}
                        <ChevronRight className="size-[1.5rem]" />
                    </Link>
                ) : null}
            </div>
            {children}
        </section>
    );
}

export function GuideIntroduction() {
    return (
        <header className="grid min-h-[31.2rem] items-center gap-[4.8rem] border-b border-[var(--adaptive-border)] px-[2.4rem] py-[6.4rem] lg:grid-cols-[1.15fr_0.85fr] lg:px-[3.2rem] xl:px-[6.4rem]">
            <div className="flex flex-col items-start gap-[2.8rem] sm:flex-row sm:items-center">
                <div className="grid size-[8rem] shrink-0 place-items-center border border-[var(--adaptive-border)] bg-[linear-gradient(135deg,var(--adaptive-surface)_30%,var(--adaptive-grey100))] text-[var(--adaptive-text-secondary)] shadow-[var(--adaptive-popup-shadow)]">
                    <MousePointer2
                        className="size-[4.4rem] fill-[var(--adaptive-grey400)] stroke-[var(--adaptive-grey600)]"
                        strokeWidth={1.1}
                    />
                </div>
                <div>
                    <h1 className="font-[family-name:var(--font-manrope)] text-[3.2rem] font-semibold tracking-[-0.04em] text-[var(--adaptive-text-primary)]">Fivepixels Documentation</h1>
                    <p className="mt-[1.2rem] max-w-[56rem] text-[1.6rem] leading-[1.5] text-[var(--adaptive-text-secondary)]">
                        Learn how to collect, discuss, recheck, and resolve precise feedback directly on your staging UI.
                    </p>
                </div>
            </div>
            <PromptCard />
        </header>
    );
}

export function FrameworkSetup({ guides }: { guides: GuideCollectionMessages; }) {
    return (
        <HomeSection
            title="Connect a framework"
            description="Start with a quickstart guide to connect your project in minutes."
        >
            <FrameworkLinks
                collection={guides}
                group={guides.navGroups[1]}
            />
        </HomeSection>
    );
}

export function PersistenceSetup() {
    return (
        <HomeSection
            title="Choose your setup"
            description="Start without a backend, or connect your API when the team needs shared feedback."
        >
            <PersistenceLinks />
        </HomeSection>
    );
}

export function GettingStarted({ guides }: { guides: GuideCollectionMessages; }) {
    return (
        <HomeSection
            title="Start with Fivepixels"
            description="Choose a simple way to start with your team."
        >
            <CompactLinks
                collection={guides}
                group={guides.navGroups[0]}
            />
        </HomeSection>
    );
}

export function ReviewWorkflow({ guides }: { guides: GuideCollectionMessages; }) {
    return (
        <HomeSection
            title="Build your review workflow"
            description="Connect reviewers, developers, and clients around one visible source of truth."
        >
            <GuideCards
                collection={guides}
                group={guides.navGroups[2]}
            />
        </HomeSection>
    );
}

export function AdoptionResources({ guides }: { guides: GuideCollectionMessages; }) {
    return (
        <HomeSection
            title="Adopt with confidence"
            description="Answer common questions and keep every marked element stable."
        >
            <CompactLinks
                collection={guides}
                group={guides.navGroups[3]}
            />
        </HomeSection>
    );
}

export function DeveloperDocumentation({ docs }: { docs: GuideCollectionMessages; }) {
    return (
        <HomeSection
            title="Developer documentation"
            description="Install Fivepixels, save feedback, and add team features when you need them."
        >
            <div className="space-y-[3.2rem]">
                {docs.navGroups.map((group) => (
                    <div key={group.label}>
                        <p className="mb-[1.6rem] font-[family-name:var(--font-manrope)] text-[1.2rem] font-semibold uppercase tracking-[0.12em] text-[var(--adaptive-text-muted)]">
                            {group.label}
                        </p>
                        <CompactLinks
                            collection={docs}
                            group={group}
                        />
                    </div>
                ))}
            </div>
        </HomeSection>
    );
}

export function ExploreResources() {
    return (
        <HomeSection
            title="Explore more"
            description="Try the product, inspect changes, or follow upcoming work."
        >
            <div className="grid grid-cols-1 gap-[1.6rem] md:grid-cols-2">
                {[
                    { href: "/example/01", title: "Live demo", description: "Leave and review feedback in a working product screen.", icon: MousePointer2 },
                    { href: "/changelog", title: "Changelog", description: "See the latest fivepixels product updates.", icon: Clipboard },
                    { href: "/roadmap", title: "Roadmap", description: "See what is planned and currently in progress.", icon: Check },
                    { href: "/docs/api", title: "API reference", description: "Find available settings and backend connection options.", icon: Braces },
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex min-h-[11.2rem] items-start justify-between rounded-[0.8rem] border border-[var(--adaptive-border)] p-[2.4rem]"
                        >
                            <div>
                                <span className="flex items-center gap-[1rem] font-[family-name:var(--font-manrope)] text-[1.5rem] font-semibold">
                                    <Icon className="size-[1.7rem] text-[var(--adaptive-text-muted)]" />
                                    {item.title}
                                </span>
                                <p className="mt-[1.2rem] text-[1.35rem] leading-[1.5] text-[var(--adaptive-text-muted)]">{item.description}</p>
                            </div>
                            <ArrowRight className="size-[1.6rem] text-[var(--adaptive-text-muted)] transition-transform group-hover:translate-x-[0.3rem]" />
                        </Link>
                    );
                })}
            </div>
        </HomeSection>
    );
}

export function SelfHosting() {
    return (
        <HomeSection
            title="Self-host Fivepixels"
            description="Get started with self-hosting Fivepixels."
            cta={{ href: "/guides/self-hosting", label: "More on self-hosting" }}
        >
            <SelfHostLinks />
        </HomeSection>
    );
}
