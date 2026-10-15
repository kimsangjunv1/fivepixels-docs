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
            links: { forDevelopers: "For developers", compare: "Compare", resources: "FAQ", overview: "Overview", guide: "Getting started", docs: "Docs", demo: "Live demo" },
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
            id: "docs",
            label: "Docs",
            href: "/docs",
            groups: [
                {
                    eyebrow: "START",
                    title: "Getting started",
                    links: [
                        { label: "Install Fivepixels", description: "React or Next.js", href: "/docs/setup", icon: "download" },
                        { label: "Your first feedback", description: "Click, write, and check", href: "/docs/quickstart", icon: "bolt" },
                        { label: "Storage modes", description: "localStorage, API, or Artemis72", href: "/docs/persistence", icon: "database" },
                    ],
                },
                {
                    eyebrow: "TEAM",
                    title: "Working together",
                    links: [
                        { label: "Review with your team", description: "Share feedback and check fixes", href: "/docs/workflow", icon: "groups" },
                        { label: "Ask a client to review", description: "A short note you can send", href: "/docs/client", icon: "send" },
                    ],
                },
                {
                    eyebrow: "HELP",
                    title: "Help and settings",
                    links: [
                        { label: "FAQ", description: "A few things to know", href: "/docs/faq", icon: "help" },
                        { label: "Troubleshooting", description: "When something does not work", href: "/docs/edge-cases", icon: "warning" },
                        { label: "All settings and API", description: "Look up an option", href: "/docs/api", icon: "api" },
                    ],
                    viewAll: { label: "Open Docs", description: "Start here", href: "/docs", icon: "arrow_forward" },
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
