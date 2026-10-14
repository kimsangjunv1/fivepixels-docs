import type { LayoutMessages } from "@/shared/i18n/landing/types";

export const layoutEn: LayoutMessages = {
    banner: "This library is currently in development.",
    header: { installGuide: "Install guide", homeAriaLabel: "agit library home", navAriaLabel: "Primary navigation" },
    footer: {
        home: {
            brand: "fivepixels",
            description: "A React review layer for leaving, discussing, rechecking, and resolving feedback directly on staging UI.",
            product: "Product",
            explore: "Explore",
            builtBy: "Built by",
            links: { forDevelopers: "For developers", compare: "Compare", resources: "FAQ", overview: "Overview", guide: "Getting started", docs: "Developer docs", demo: "Live demo" },
            builtByCopy: "MIT open source, designed to start with one high-value page.",
            copyright: "© 2026 fivepixels. MIT License.",
            tagline: "Feedback on the screen, not in a screenshot",
        },
        site: {
            codi: "CODI",
            handle: "@kimsangjunv1",
            developedBy: "Developed and Designed by",
            author: "kimsangjun",
            currentLibrary: "current available library",
            libraries: "agit.\nfivepixels.",
            githubAria: "GitHub",
            linkedInAria: "LinkedIn",
            logoAlt: "fivepixels",
        },
    },
    megaMenus: [
        {
            id: "main",
            label: "Main",
            href: "/",
            groups: [
                {
                    eyebrow: "PRODUCT",
                    title: "Product",
                    links: [
                        { label: "Introduction", description: "DOM-aware screen feedback", href: "/#intro", icon: "home" },
                        { label: "Pain points", description: "Context lost in screenshots and chat", href: "/#pain", icon: "sentiment_dissatisfied" },
                        { label: "Three-step flow", description: "Open → click → resolve", href: "/#how-it-works", icon: "checklist" },
                    ],
                },
                {
                    eyebrow: "WHY",
                    title: "Features and adoption",
                    links: [
                        { label: "UI Edit", description: "Before / After on the screen", href: "/#ui-edit", icon: "edit" },
                        { label: "Developer confidence", description: "Half-day, Shadow DOM, devOnly", href: "/#developers", icon: "code" },
                        { label: "Who it is for", description: "Startups, freelancers, small teams", href: "/#audience", icon: "groups" },
                    ],
                    viewAll: { label: "View the product", description: "fivepixels landing", href: "/", icon: "arrow_forward" },
                },
            ],
        },
        {
            id: "guides",
            label: "Guides",
            href: "/guides",
            groups: [
                {
                    eyebrow: "START",
                    title: "Start",
                    links: [
                        { label: "Quick start", description: "Reviewer and developer paths", href: "/guides/quickstart", icon: "bolt" },
                        { label: "One-week plan", description: "Start with one page", href: "/guides/rollout", icon: "calendar_month" },
                        { label: "Team rules", description: "Status and ownership", href: "/guides/rules", icon: "rule" },
                    ],
                },
                {
                    eyebrow: "REVIEW",
                    title: "Review",
                    links: [
                        { label: "Client guide", description: "A note you can send", href: "/guides/client", icon: "send" },
                        { label: "Workflow", description: "Report through resolution", href: "/guides/workflow", icon: "account_tree" },
                        { label: "Roles", description: "QA, design, PM, development", href: "/guides/roles", icon: "groups" },
                    ],
                },
                {
                    eyebrow: "REFERENCE",
                    title: "Quick reference",
                    links: [
                        { label: "FAQ", description: "Common adoption questions", href: "/guides/faq", icon: "help" },
                        { label: "DOM tagging", description: "data-report-id naming", href: "/guides/dom-tagging", icon: "ads_click" },
                    ],
                    viewAll: { label: "Open the guides", description: "Start here", href: "/guides", icon: "arrow_forward" },
                },
            ],
        },
        {
            id: "docs",
            label: "Docs",
            href: "/docs/setup",
            groups: [
                {
                    eyebrow: "START",
                    title: "Foundations",
                    links: [
                        { label: "Install Fivepixels", description: "Start in a few minutes", href: "/docs/setup", icon: "download" },
                        { label: "DOM attributes", description: "Markers and hidden UI", href: "/docs/dom-attributes", icon: "data_object" },
                        { label: "Modes", description: "Report and View states", href: "/docs/modes", icon: "toggle_on" },
                    ],
                },
                {
                    eyebrow: "FEATURES",
                    title: "Features",
                    links: [
                        { label: "UI Edit", description: "Workflow and session limits", href: "/docs/ui-edit", icon: "edit" },
                        { label: "Save feedback", description: "Use this browser or your API", href: "/docs/persistence", icon: "database" },
                        { label: "Auth and team", description: "Login and reviewer keys", href: "/docs/auth-and-team", icon: "group" },
                        { label: "GitHub", description: "Promote to an Issue", href: "/docs/github", icon: "merge" },
                    ],
                },
                {
                    eyebrow: "REFERENCE",
                    title: "Reference",
                    links: [
                        { label: "Panel and tabs", description: "Stable and experimental tabs", href: "/docs/panel-and-tabs", icon: "dock_to_right" },
                        { label: "Threads and mentions", description: "Cases and replies", href: "/docs/mentions-and-thread", icon: "forum" },
                        { label: "Props API", description: "Settings and backend connections", href: "/docs/api", icon: "api" },
                        { label: "Edge cases", description: "Pre-rollout checks", href: "/docs/edge-cases", icon: "warning" },
                    ],
                    viewAll: { label: "Open developer docs", description: "Start with setup", href: "/docs/setup", icon: "arrow_forward" },
                },
            ],
        },
        {
            id: "examples",
            label: "Demo",
            href: "/example/01",
            groups: [
                {
                    eyebrow: "DASHBOARD",
                    title: "Live demo",
                    links: [
                        { label: "Overview", description: "Dashboard, kanban, activity", href: "/example/01", icon: "dashboard" },
                        { label: "Issues", description: "Issue list and modals", href: "/example/01/issues", icon: "bug_report" },
                        { label: "Reviews", description: "Feedback workflow", href: "/example/01/reviews", icon: "rate_review" },
                    ],
                },
                {
                    eyebrow: "LABS",
                    title: "Test screens",
                    links: [
                        { label: "Releases", description: "Release note UI", href: "/example/01/releases", icon: "rocket_launch" },
                        { label: "Modal Lab", description: "Modal reveal edge cases", href: "/example/01/modals", icon: "layers" },
                        { label: "Settings", description: "Settings screen", href: "/example/01/settings", icon: "settings" },
                    ],
                    viewAll: { label: "Open demo", description: "An app with fivepixels", href: "/example/01", icon: "arrow_forward" },
                },
            ],
        },
    ],
};
