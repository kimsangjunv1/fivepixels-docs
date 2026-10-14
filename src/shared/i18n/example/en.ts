import type { ExampleMessages } from "@/shared/i18n/landing/types";

export const exampleEn: ExampleMessages = {
    nav: [
        { id: "overview", icon: "dashboard", label: "Overview", href: "/example/01" },
        { id: "issues", icon: "bug_report", label: "Issues", href: "/example/01/issues" },
        { id: "reviews", icon: "rate_review", label: "Reviews", href: "/example/01/reviews" },
        { id: "releases", icon: "rocket_launch", label: "Releases", href: "/example/01/releases" },
        { id: "modals", icon: "layers", label: "Modal Lab", href: "/example/01/modals" },
        { id: "settings", icon: "settings", label: "Settings", href: "/example/01/settings" },
    ],
    shell: {
        backLink: "Back to library",
        brand: "Pulse Board",
        workspace: "fivepixels-demo",
        createIssue: "Create issue",
        sidebarNote: "Sidebar menu items navigate to real routes. Create issue opens a global modal.",
        searchPlaceholder: "Search issues, tags, or people...",
        filter: "Filter",
        profile: "Sangjun",
        navAriaLabel: "Dashboard navigation",
    },
    overview: {
        stats: [
            { label: "Open issues", delta: "+3 today" },
            { label: "Staged feedback", delta: "5 awaiting review" },
            { label: "Resolved this week", delta: "+12% vs last week" },
        ],
        kanban: [
            {
                column: "To Do",
                cards: [
                    { title: "Hero spacing on mobile", tag: "BUG" },
                    { title: "Update onboarding copy", tag: "COPY" },
                    { title: "Dark mode toggle contrast", tag: "A11Y" },
                ],
            },
            {
                column: "In Review",
                cards: [
                    { title: "Modal z-index stacking", tag: "BUG" },
                    { title: "Table row hover state", tag: "UI" },
                ],
            },
            {
                column: "Done",
                cards: [
                    { title: "Filter hint wording", tag: "COPY" },
                    { title: "Filter button alignment", tag: "UI" },
                ],
            },
        ],
        activityTitle: "Recent activity",
        activities: [
            "Kim left feedback on Sidebar nav item · 2m ago",
            "Lee resolved Kanban card #card-06 · 18m ago",
            "Park tagged as BUG on Search input · 1h ago",
            "Choi moved to In Review Modal overlay case · 3h ago",
            "Jung commented on Dashboard scroll area · 5h ago",
            "Han opened modal for New issue form · Yesterday",
        ],
    },
    issues: {
        eyebrow: "ISSUES",
        title: "Issue tracker",
        description:
            "Test table, filters, action buttons, and Issues-specific modal cases (display:none, horizontal scroll).",
        openDetail: "Open display:none issue detail",
        openModal: "Open horizontal scroll issue modal",
    },
    reviews: {
        eyebrow: "REVIEWS",
        title: "Pending reviews",
        description: "Review approval flow with opacity and zustand modal cases mixed together.",
        items: [
            { title: "Modal z-index overlap", author: "Lee", status: "Awaiting QA" },
            { title: "Sidebar active state", author: "Kim", status: "Needs copy" },
            { title: "Kanban card hover", author: "Park", status: "Ready to ship" },
            { title: "Notification bell badge", author: "Choi", status: "Blocked" },
        ],
        requestChanges: "Request changes",
        approve: "Approve",
        openModal: "Open opacity approval modal",
    },
    releases: {
        eyebrow: "RELEASES",
        title: "Release notes",
        description: "Click view changelog to open a vertical scroll modal and test Report markers.",
        items: [
            { version: "v2.4.0", summary: "Kanban drag preview and marker persistence fixes" },
            { version: "v2.3.2", summary: "Improved modal layering inside nested scroll containers" },
            { version: "v2.3.0", summary: "Dashboard activity feed and quick actions rollout" },
            { version: "v2.2.1", summary: "Sidebar routing and modal lab consolidation" },
        ],
        viewChangelog: "View changelog",
    },
    settings: {
        eyebrow: "SETTINGS",
        title: "Workspace settings",
        description: "Leave Report markers on toggles, inputs, and save buttons.",
        toggles: [
            {
                label: "Email notifications",
                description: "Receive updates when issues are assigned to you.",
            },
            {
                label: "Persist markers",
                description: "Keep feedback markers after route changes within the demo.",
            },
        ],
        webhookLabel: "Webhook URL",
        webhookPlaceholder: "https://hooks.example.com/qa",
        save: "Save changes",
    },
    modalsLab: {
        eyebrow: "MODAL LAB",
        title: "Modal edge cases",
        description:
            "DOM patterns that Report tools might miss, collected in one place. Keep zustand and opacity modal state after navigating between pages.",
        cases: [
            {
                title: "Zustand boolean",
                description: "Mount/unmount via global store open state",
                technique: "conditional render",
            },
            {
                title: "Opacity",
                description: "Keep DOM + toggle opacity/pointer-events",
                technique: "opacity-0",
            },
            {
                title: "Display none",
                description: "Exists in DOM only when open",
                technique: "hidden / unmount",
            },
            {
                title: "Visibility hidden",
                description: "Hide visually with invisible class",
                technique: "visibility",
            },
            {
                title: "Transform off-screen",
                description: "Move off-screen with translate",
                technique: "transform",
            },
            {
                title: "Vertical scroll",
                description: "Vertical scroll in modal body",
                technique: "overflow-y-auto",
            },
            {
                title: "Horizontal scroll",
                description: "Horizontal scroll for wide tables",
                technique: "overflow-x-auto",
            },
            {
                title: "Nested scroll overlay",
                description: "Overlay itself scrolls",
                technique: "overlay scroll",
            },
            {
                title: "Nested modal stack",
                description: "Two-level modal on modal",
                technique: "z-index stack",
            },
            {
                title: "Inline positioned",
                description: "Placed inside parent container without fixed",
                technique: "absolute in scroll",
            },
        ],
        openModal: "Open modal",
        hostTitle: "Inline modal host (scroll container)",
        hostDescription:
            "Modal positioned absolute inside this scroll area without a fixed portal. Reproduces cases where background scroll overlaps.",
        close: "Close",
        fillerTitle: "Inline positioned modal",
        fillerDescription:
            "Positioned relative to the parent scroll container, not viewport fixed.",
    },
    listDemo: {
        eyebrow: "FEEDBACK LIST",
        title: "Today's issues",
        filter: "Filter",
        headers: ["Issue", "Status", "Tag", "Author", "Action"],
        rows: [
            {
                issue: "Hero CTA alignment",
                status: "STAGED",
                tag: "IMPORTANT",
                author: "Kim",
                action: "Review",
            },
            {
                issue: "Modal z-index overlap",
                status: "OPEN",
                tag: "BUG",
                author: "Lee",
                action: "Review",
            },
            {
                issue: "Table row hover state",
                status: "STAGED",
                tag: "BUG",
                author: "Park",
                action: "Review",
            },
            {
                issue: "Filter hint copy",
                status: "RESOLVED",
                tag: "IMPORTANT",
                author: "Choi",
                action: "Review",
            },
            {
                issue: "Mobile nav spacing",
                status: "OPEN",
                tag: "IMPORTANT",
                author: "Jung",
                action: "Review",
            },
        ],
    },
    createIssue: {
        eyebrow: "NEW ISSUE",
        title: "Report an issue",
        close: "Close",
        formTitle: "Title",
        formDescription: "Description",
        titlePlaceholder: "e.g. Sidebar overlap on tablet",
        descriptionPlaceholder: "Describe what you found...",
        tags: ["BUG", "COPY", "IMPORTANT"],
        submit: "Create issue",
        cancel: "Cancel",
    },
    fivePixels: {
        messageLabel: "Message",
        bugLabel: "bug",
        importantLabel: "IMPORTANT",
    },
};
