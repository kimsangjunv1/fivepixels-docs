import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, MousePointer2 } from "lucide-react";
import type { GuideCollectionMessages, GuideNavGroup } from "@/shared/i18n/guide/types";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";

const guideIcons: Record<string, string> = {
    quickstart: "bolt",
    react: "code",
    nextjs: "code",
    "api-connection": "api",
    "local-storage": "database",
    artemis72: "rocket_launch",
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
            description: "Start here. Feedback stays in this browser. No server needed.",
            href: "/docs/local-storage",
            icon: "database",
            badge: "Start here",
        },
        {
            title: "API",
            description: "Save feedback on your own server and share it with your team.",
            href: "/docs/api-connection",
            icon: "api",
            badge: "Your server",
        },
        {
            title: "Artemis72",
            description: "Our planned hosted service for teams. Not available yet.",
            href: "/docs/artemis72",
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
                        Add Fivepixels to your app and leave your first feedback. Start without a server.
                    </p>
                </div>
            </div>
            <div className="rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2.4rem]">
                <p className="text-[1.6rem] font-semibold text-[var(--adaptive-text-primary)]">New to Fivepixels?</p>
                <p className="mt-[1rem] text-[1.4rem] leading-[1.5] text-[var(--adaptive-text-muted)]">Install it, open your app, and leave a note. You can set up team sharing later.</p>
                <Link href="/docs/setup" className="mt-[1.6rem] inline-flex items-center gap-[0.4rem] text-[1.4rem] font-medium text-[var(--adaptive-accent-coral)]">
                    Install Fivepixels <ChevronRight className="size-[1.5rem]" />
                </Link>
            </div>
        </header>
    );
}

export function FrameworkSetup({ docs }: { docs: GuideCollectionMessages }) {
    return (
        <HomeSection title="Install Fivepixels" description="Choose your framework. No server setup needed.">
            <FrameworkLinks collection={docs} group={{ label: "Framework", items: [{ slug: "react", label: "React" }, { slug: "nextjs", label: "Next.js" }] }} />
        </HomeSection>
    );
}

export function GettingStarted({ docs }: { docs: GuideCollectionMessages }) {
    return (
        <HomeSection title="Your first feedback" description="Pick a spot, leave a note, and check that it was saved.">
            <CompactLinks collection={docs} group={{ label: "Start", items: [{ slug: "quickstart", label: "Leave your first feedback" }] }} />
        </HomeSection>
    );
}

export function PersistenceSetup() {
    return (
        <HomeSection title="Where feedback is saved" description="Start with localStorage. Connect your API when you need to share feedback.">
            <PersistenceLinks />
        </HomeSection>
    );
}

export function ReviewWorkflow({ docs }: { docs: GuideCollectionMessages }) {
    return (
        <HomeSection title="Working together" description="Share feedback with your team or ask a client to review.">
            <GuideCards collection={docs} group={docs.navGroups[2]} />
        </HomeSection>
    );
}

export function AdoptionResources({ docs }: { docs: GuideCollectionMessages }) {
    return (
        <HomeSection title="Need a hand?" description="Find a quick answer or look up a setting when you need it." cta={{ href: "/docs/api", label: "All settings and API" }}>
            <CompactLinks collection={docs} group={docs.navGroups[3]} />
        </HomeSection>
    );
}
