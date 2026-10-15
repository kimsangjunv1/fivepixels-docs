import type { FivepixelsMessages } from "@/shared/i18n/landing/types";

export const fivepixelsEn: FivepixelsMessages = {
    panelTitles: [
        "Why do so many teams\nstill struggle to adopt QA tools?",
        "Three steps is enough now",
        "No more explaining things in words",
        "Only the review features you need",
        "Flexible ways to work",
        "Built for individuals",
        "Teams that need QA right now",
        "Low adoption friction, clear team habits",
        "Questions before you adopt",
    ],
    intro: {
        headline: ["Excellence Easy Way For QA"],
        announcement: "React 18+ · MIT · @fivepixels-js/react 0.2.24",
        bodyLine1: "You do not need a heavyweight QA platform.",
        bodyHighlight: "Click the exact location",
        bodyLine2: "review it with the team, and promote it to an issue only when needed.",
        demoCta: "Live demo",
        guideCta: "5-minute guide",
    },
    pain: {
        eyebrow: "WHY TEAMS MISS THINGS",
        titleLine1: "Why does feedback",
        titleLine2: "keep losing context?",
        bodyLine1: "The moment feedback leaves the screen for screenshots and chat,",
        bodyLine2: "the team starts explaining the location and intent all over again.",
        cards: [
            {
                eyebrow: "01 / CONTEXT",
                title: "Feedback drifts away from the screen.",
                description: "The moment it moves to screenshots and chat, it's hard to remember exactly what you were talking about.",
            },
            {
                eyebrow: "02 / REVIEW",
                title: '"Which button?" keeps coming back.',
                description: "Without markers, every review round starts with finding it again and explaining it again.",
            },
            {
                eyebrow: "03 / SETUP",
                title: "Heavy QA rollouts keep getting postponed.",
                description: "When adoption looks like a big project, the review flow you actually need keeps slipping to the next release.",
            },
            {
                eyebrow: "04 / HANDOFF",
                title: "Client feedback stays vague.",
                description: "One comment on the product screen lands faster than a long annotated message thread.",
            },
        ],
    },
    howItWorks: {
        steps: [
            {
                number: "01",
                title: "Open staging",
                description: "Start on the same review screen your team already shares.",
            },
            {
                number: "02",
                title: "Click and leave feedback",
                description: "Instead of a messenger thread, pin comments right where you clicked.",
            },
            {
                number: "03",
                title: "Confirm and resolve",
                description: "Replies, status changes, and re-review stay in one flow.",
            },
        ],
    },
    uiEdit: {
        items: [
            {
                scene: "marker-tooltip",
                label: "01 / CASES",
                title: "Follow the case in context",
                description: "Open the marker window to see the case list, thread, assignee, and status without leaving the page under review.",
                eyebrow: "MARKER WINDOW",
            },
            {
                scene: "feedback-composer",
                label: "02 / DESCRIBE",
                title: "Add feedback on the spot",
                titleLine2: "inspect, write, complete",
                description: "Inspect the element, write the change in the composer, and hit Complete Feedback without switching tools.",
                eyebrow: "FEEDBACK COMPOSER",
            },
            {
                scene: "panel-overview",
                label: "03 / OVERVIEW",
                title: "See the whole review surface",
                description: "Collapse to a quick activity bar, or expand the panel to browse every feedback item on the page.",
                eyebrow: "PANEL OVERVIEW",
            },
            {
                scene: "device-preview",
                label: "04 / DEVICE",
                title: "Check feedback across viewports",
                description: "Laptop, Mobile, and Dark mode notes stay pinned on the same screen, so responsive issues keep their breakpoint context.",
                eyebrow: "DEVICE PREVIEW",
            },
        ],
    },
    features: [
        {
            icon: "ads_click",
            title: "One-click feedback",
            description: "Leave it on the element—no more explaining which one",
        },
        {
            icon: "location_searching",
            title: "Pinned location",
            description: "Reopen the page and the same spot is recognized automatically",
        },
        {
            icon: "chat",
            title: "On-screen comments",
            description: "Review and discuss without switching apps",
        },
        {
            icon: "forum",
            title: "Live replies and confirmation",
            description: "Replies, confirmations, and resolutions in one flow",
        },
        {
            icon: "edit",
            title: "Direct UI tweaks",
            description: "Adjust text, spacing, color, alignment, and more on screen",
        },
        {
            icon: "compare",
            title: "Before / After",
            description: "See before and after states at a glance",
        },
        {
            icon: "hourglass_top",
            title: "Faster alignment",
            description: "Move from verbal explanations to visual agreement",
        },
        {
            icon: "assignment_turned_in",
            title: "Clear intent",
            description: "No vague feedback—just actionable changes",
        },
        {
            icon: "input",
            title: "Drop onto staging",
            description: "Attach to your current screen—no separate QA SaaS",
        },
        {
            icon: "lightbulb",
            title: "Minimal learning curve",
            description: "Leave and view modes—anyone can start right away",
        },
        {
            icon: "rocket_launch",
            title: "Quick setup",
            description: "Add it once near the root of your React app",
        },
        {
            icon: "person_pin",
            title: "Client handoff guide",
            description: "Clients can join reviews quickly via /docs/client",
        },
        {
            icon: "code",
            title: "Shadow DOM support",
            description: "Independent styling without host CSS interference",
        },
        {
            icon: "sd_storage",
            title: "Try without a backend",
            description: "Save feedback in your current browser",
        },
        {
            icon: "filter_1",
            title: "Gradual rollout",
            description: "Tag only what you need with data-report-id—no full-app tagging",
        },
        {
            icon: "lock_open",
            title: "Hide it on your live site",
            description: "Use `visibility.devOnly` while your team reviews staging",
        },
    ],
    developerRelief: {
        tabAriaLabel: "Adoption paths",
        guideLink: "Start setup",
        steps: [
            {
                id: "solo",
                tabLabel: "Just me · No backend",
                eyebrow: "FOR SOLO",
                title: "Install once and you're done",
                description: "Use it personally without an API or server",
                code: `// 1) Install
npm install @fivepixels-js/react react react-dom

// 2) Mount once at the app root
<FivePixels
  project={{ id: "my-app" }}
  visibility={{ devOnly: true }}
/>

// 3) Only on elements you want (optional)
<button data-report-id="hero-cta">
  Get started
</button>`,
                highlights: [
                    {
                        title: "Side-project notes",
                        detail: "Leave comments right on the screen and find the same spot again later.",
                    },
                    {
                        title: "One staging page",
                        detail: "Start light by adding data-report-id to just one high-traffic review page.",
                    },
                    {
                        title: "Hide in production",
                        detail: "Use devOnly on internal and staging environments—keep it off live.",
                    },
                ],
                showGuideLink: true,
            },
            {
                id: "team",
                tabLabel: "Small team · Share a file",
                eyebrow: "FOR FE TEAMS",
                title: "Collaborate even without a server",
                description: "Leave feedback on staging without a backend, then pass JSON import/export files between teammates.",
                note: "* This is file-based collaboration, not real-time sync.\nThat's why QA works without a backend.",
                code: `// No adapter = saved in this browser
<FivePixels
  project={{ id: "my-app", env: "stage" }}
/>

// From the settings panel
// · Export data (JSON download)
// · Import data (file / drag and drop)`,
                highlights: [
                    {
                        title: "Frontend-only startups",
                        detail: "Start reviews with designers and PMs on staging—no backend headcount required.",
                    },
                    {
                        title: "Share files with teammates",
                        detail: "A exports → B imports to continue the same feedback list.",
                    },
                    {
                        title: "Client and external review",
                        detail: "Hand off external review results in a single JSON file.",
                    },
                ],
            },
            {
                id: "api",
                tabLabel: "Team · Connect API",
                eyebrow: "FOR PRODUCT TEAMS",
                title: "Connect to your infrastructure",
                description: "As the team grows, connect Fivepixels to your backend with FivePixelsAdapter and share the same feedback across browsers.",
                code: `<FivePixels
  project={{ id: "my-app", env: "stage" }}
  sync="api"
  adapter={adapter}
  onEvent={(event) => notifyTeam(event)}
  github={{
    enabled: true,
    modes: ["on-create", "from-list"],
    onCreate: createGitHubIssue,
  }}
/>`,
                highlights: [
                    {
                        title: "Connect your backend",
                        detail: "FivePixelsAdapter connects feedback and review data to your API.",
                    },
                    {
                        title: "GitHub Issues",
                        detail: "Promote feedback to Issues and leave links in the thread.",
                    },
                    {
                        title: "Slack and Notion alerts",
                        detail: "Send create, reply, and resolve events to team channels with onEvent.",
                    },
                ],
            },
        ],
    },
    compare: {
        beforeHeader: "Current flow",
        afterHeader: "fivepixels",
        rows: [
            ["Screenshots + arrows", "Markers pinned on screen"],
            ["Back and forth on Slack or email", "Status and replies in one list"],
            ['"That button over there"', "Comments on the element you clicked"],
            ["Heavy adoption review first", "Light attach on staging"],
            ["Repeated client re-confirmation", "Re-review unresolved items only"],
        ],
    },
    audience: {
        cards: [
            {
                title: "Early startups",
                description: "Founders, PMs, and designers review directly—and feedback scatters across verbal updates.",
            },
            {
                title: "Teams without a system",
                description: "Tools exist but rules don't, so the same issue gets explained again across channels.",
            },
            {
                title: "Freelancers",
                description: 'When clients say "just a small tweak," you want to pin it right on the screen.',
            },
            {
                title: "Teams with no rollout bandwidth",
                description: "Learning a new QA app and onboarding feels bigger than shipping itself.",
            },
        ],
    },
    adoption: {
        whyEyebrow: "WHY IT FEELS LIGHT",
        reasons: [
            {
                label: "No separate QA app",
                detail: "Reviews happen on the staging URL your team already shares.",
            },
            {
                label: "MIT, start small",
                detail: "Closer to attaching what you need than counting seats or seat limits.",
            },
            {
                label: "Start without a backend",
                detail: "Try the localStorage setup before connecting your API.",
            },
            {
                label: "Client-ready handoff",
                detail: "A short guide is enough for external reviewers to start leaving feedback.",
            },
        ],
        rolloutEyebrow: "1 WEEK ROLLOUT TASTE",
        rolloutSteps: [
            {
                day: "DAY 0",
                title: "Install and add it once",
                description: "Add Fivepixels near the app root and use visibility.devOnly so it only shows during review.",
            },
            {
                day: "DAY 1",
                title: "Start with one high-traffic page",
                description: "Instead of tagging the whole app, add data-report-id to one screen with repeated feedback.",
            },
            {
                day: "DAY 2+",
                title: "Connect your backend when needed",
                description: "Add shared saving, team rules, and GitHub Issues only when the team needs them.",
            },
        ],
        clientNoteEyebrow: "CLIENT NOTE",
        clientNote: "Open the staging link, click where a change is needed, and leave feedback right on the screen. No extra tool training required.",
    },
    faq: [
        {
            question: "Does it change code automatically?",
            answer: "No. UI Edit lasts only for the current tab session and resets on refresh. fivepixels supports review and communication; it never edits the codebase automatically.",
        },
        {
            question: "Can clients use it right away?",
            answer: "Yes. Because feedback stays on the product screen they are already viewing, it feels natural on staging reviews.",
        },
        {
            question: "Do I need a backend from day one?",
            answer: "No. Start with localStorage, then connect your API when teammates need to see the same feedback.",
        },
        {
            question: "How much setup is involved?",
            answer: "We aim for a small start: install, mount once, and tag one high-traffic review area.",
        },
    ],
    openSource: {
        title: "Free & Open Source",
        bodyLine1: "fivepixels is free and open source. Rather than learning yet another QA SaaS,",
        bodyLine2: "we add a thin review layer on top of the product screen you already use.",
        cta: "contribute",
        broughtBy: "BROUGHT BY CODI",
        handle: "@kimsangjunv1",
        profileAlt: "Codi profile",
    },
};
