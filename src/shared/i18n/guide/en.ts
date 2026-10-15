import type { GuideCollectionMessages, GuidePageMessages, GuideSection } from "./types";

const demoCta = { cta: "Live demo", ctaHref: "/example/01", installCommand: "" };

function makePage(slug: string, eyebrow: string, title: string, description: string, sections: GuideSection[], heroOptions: Partial<GuidePageMessages["hero"]> = {}): GuidePageMessages {
    return {
        slug,
        title,
        description,
        hero: { eyebrow, title, description, ...demoCta, ...heroOptions },
        sections,
    };
}

const quickstart = makePage("quickstart", "FIRST FEEDBACK", "Leave your first feedback", "Pick a spot on your page, leave a note, and check that it was saved.", [
    {
        id: "report",
        title: "Leave a note",
        variant: "quick-start",
        stepLabel: "01 / REPORT",
        blocks: [
            { type: "ordered", items: ["Open a page where Fivepixels is installed.", "Open the Fivepixels panel and select Report.", "Click the part of the page you want to review.", "Write what needs to change and submit."] },
        ],
    },
    {
        id: "check",
        title: "Find it again",
        variant: "quick-start",
        stepLabel: "02 / CHECK",
        blocks: [
            { type: "ordered", items: ["Select View in the panel.", "Open the marker to read your feedback.", "Refresh the page and check that the feedback is still there."] },
            { type: "callout", variant: "info", text: "With the default localStorage mode, feedback stays in this browser. Sharing the page URL does not share its feedback." },
        ],
    },
], { cta: "Install Fivepixels", ctaHref: "/docs/setup" });

const react = makePage(
    "react",
    "INSTALL",
    "Use fivepixels with React",
    "Install Fivepixels and add it once to your React app. No server setup needed.",
    [
        {
            id: "install",
            title: "Install the package",
            stepLabel: "01 / INSTALL",
            variant: "quick-start",
            blocks: [
                { type: "codeRaw", language: "bash", code: "npm install @fivepixels-js/react react react-dom" },
                { type: "paragraph", text: "Use React 18 or later. Fivepixels includes its own styles, so no CSS import is needed." },
            ],
        },
        {
            id: "mount",
            title: "Add FivePixels once",
            variant: "reference",
            blocks: [
                {
                    type: "codeRaw",
                    language: "tsx",
                    code: 'import { FivePixels } from "@fivepixels-js/react";\n\nexport default function App() {\n  return (\n    <>\n      <FivePixels\n        project={{ id: "my-app" }}\n      />\n      <main>{/* Your application */}</main>\n    </>\n  );\n}',
                },
                { type: "callout", variant: "info", text: "Add FivePixels once near the root of the app so it can follow every page your team reviews." },
            ],
        },
        {
            id: "check",
            title: "Open your app",
            variant: "reference",
            blocks: [
                { type: "paragraph", text: "Start your app and open it in the browser. You should see the Fivepixels button. Feedback is saved in this browser by default." },
            ],
        },
    ],
    { installCommand: "npm install @fivepixels-js/react react react-dom" },
);

const nextjs = makePage(
    "nextjs",
    "INSTALL",
    "Use fivepixels with Next.js",
    "Install Fivepixels in a Next.js App Router project. Start with feedback saved in your browser.",
    [
        {
            id: "install",
            title: "Install the package",
            stepLabel: "01 / INSTALL",
            variant: "quick-start",
            blocks: [{ type: "codeRaw", language: "bash", code: "npm install @fivepixels-js/react react react-dom" }],
        },
        {
            id: "client-component",
            title: "Create a client component",
            variant: "reference",
            blocks: [
                {
                    type: "codeRaw",
                    language: "tsx",
                    code: '// src/components/FivepixelsClient.tsx\n"use client";\n\nimport { FivePixels } from "@fivepixels-js/react";\n\nexport function FivepixelsClient() {\n  return (\n    <FivePixels\n      project={{ id: "my-next-app" }}\n    />\n  );\n}',
                },
                { type: "callout", variant: "info", text: 'Keep "use client" at the top of this file because Fivepixels runs in the browser.' },
            ],
        },
        {
            id: "layout",
            title: "Add it to the root layout",
            variant: "reference",
            blocks: [
                {
                    type: "codeRaw",
                    language: "tsx",
                    code: '// src/app/layout.tsx\nimport { FivepixelsClient } from "@/components/FivepixelsClient";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>\n        <FivepixelsClient />\n        {children}\n      </body>\n    </html>\n  );\n}',
                },
                { type: "paragraph", text: "Start your app and open it in the browser. You should see the Fivepixels button. Feedback is saved in this browser by default." },
            ],
        },
    ],
    { installCommand: "npm install @fivepixels-js/react react react-dom" },
);

const client = makePage("client", "CLIENT HANDOFF", "Ask a client to review", "Send a short note so your client knows where to leave feedback.", [
    {
        id: "message",
        title: "Copyable client note",
        variant: "quick-start",
        stepLabel: "SEND THIS",
        blocks: [
            {
                type: "copy",
                label: "Copy client note",
                text: "Subject: Please mark changes directly on staging\n\nHello. Open the staging link below and click the exact place that needs a change.\n\n1. Open the link.\n2. Enter Report mode.\n3. Click the element and write your request.\n4. Submit it and confirm the marker in View mode.\n\nYou do not need to send a separate screenshot or describe ‘the button near the top.’",
            },
        ],
    },
    {
        id: "expectation",
        title: "Set expectations",
        variant: "reference",
        blocks: [
            {
                type: "list",
                items: ["Use API mode before asking clients to leave feedback you need to see.", "Sharing a URL does not share feedback saved in localStorage.", "Check that the client can open the page and leave a note."],
            },
        ],
    },
]);

const workflow = makePage("workflow", "TEAM REVIEW", "Review with your team", "Share feedback, make the change, and ask the person who reported it to check again.", [
    {
        id: "share",
        title: "Make sure everyone sees the same feedback",
        variant: "quick-start",
        stepLabel: "01 / SHARE",
        blocks: [
            { type: "paragraph", text: "localStorage saves feedback in one browser. To work on the same feedback together, connect your API. Artemis72, our planned hosted service, is not available yet." },
            { type: "link", href: "/docs/api-connection", label: "Connect your API" },
        ],
    },
    {
        id: "flow",
        title: "Keep the review simple",
        variant: "reference",
        blocks: [
            { type: "ordered", items: ["Leave one change request per feedback item.", "Agree on who will make the change.", "Keep questions and updates in the same feedback thread.", "After the fix, ask the original reviewer to check the page and mark it resolved."] },
            { type: "paragraph", text: "Anyone on the team can report a problem. You do not need a separate process for designers, developers, or clients." },
        ],
    },
]);

const faq = makePage("faq", "FAQ", "Frequently asked questions", "A few things to know before you start.", [
    {
        id: "answers",
        title: "Core answers",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Question", "Answer"],
                rows: [
                    ["Does it edit the code?", "No. UI Edit is session-only and resets on refresh."],
                    ["Can clients use it?", "Yes. Use API mode for shared feedback, then send the client review note."],
                    ["Can non-developers use it?", "A developer installs it once; reviewers can run the workflow afterward."],
                    ["Will it break our CSS?", "Fivepixels keeps its styles separate from your app. No CSS import is needed."],
                    ["Does it work in SPAs?", "Yes. See feedback location settings if markers need to follow another page, modal, or tab."],
                    ["How do we share data?", "localStorage is device-local. Use an API Adapter or manual JSON transfer."],
                    ["Should it run in production?", "Usually it is limited to staging with visibility settings."],
                    ["Does it replace E2E tests?", "No. It is a React library for on-screen review and communication."],
                ],
            },
        ],
    },
]);

const domTagging = makePage("dom-tagging", "DOM TAGGING", "Use stable data-report-id values", "Add stable names to high-value review targets without changing layout or logic.", [
    {
        id: "rules",
        title: "Tagging rules",
        variant: "quick-start",
        stepLabel: "NAMING",
        blocks: [
            {
                type: "list",
                items: [
                    "Use kebab-case letters, numbers, and hyphens.",
                    "Prefer route-section-role.",
                    "Use a stable id or slug instead of a list index.",
                    "Start with headers, footers, nav, major sections, buttons, links, and inputs.",
                    "Do not add wrapper elements only for tagging.",
                    "Add data-report-type only when the team has a policy.",
                ],
            },
            {
                type: "codeRaw",
                language: "tsx",
                code: '<section data-report-id="pricing-hero" data-report-type="group">\n  <button data-report-id="pricing-hero-cta">Get started</button>\n</section>',
            },
        ],
    },
    {
        id: "hidden-ui",
        title: "Hidden modals and tabs",
        variant: "reference",
        blocks: [
            { type: "paragraph", text: "Connect matching data-fp-view and data-fp-open values. Nested views are restored from the outside in." },
            { type: "link", href: "/docs/dom-attributes", label: "Read the DOM attribute reference" },
        ],
    },
]);

const setup = makePage("setup", "INSTALL", "Install Fivepixels", "Choose your framework, add Fivepixels, and open your app. Start without a server.", [
    {
        id: "install",
        title: "Choose your framework",
        variant: "quick-start",
        stepLabel: "INSTALL",
        blocks: [
            { type: "paragraph", text: "You need a React 18 or later app. Choose the instructions for your project." },
            { type: "actions", links: [
                { href: "/docs/react", label: "React", description: "Add Fivepixels to your app" },
                { href: "/docs/nextjs", label: "Next.js", description: "For projects using the App Router" },
            ] },
            { type: "callout", variant: "info", text: "Feedback is saved in the current browser with localStorage by default. You can connect your API later when you need shared feedback." },
            { type: "link", href: "/docs/quickstart", label: "Already installed? Leave your first feedback" },
        ],
    },
]);

const domAttributes = makePage("dom-attributes", "DOM ATTRIBUTES", "Keep feedback in the right place", "Give important elements a stable name so feedback can find them again after the page changes.", [
    ...domTagging.sections.slice(0, 1),
    {
        id: "attributes",
        title: "Attribute reference",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Attribute", "Required", "Purpose"],
                rows: [
                    ["data-report-id", "Recommended", "Stable element id; CSS selector is the fallback."],
                    ["data-report-type", "Optional", "item (default) or group"],
                    ["data-fp-view", "Optional", "Key for a modal or tab that must be revealed"],
                    ["data-fp-open", "Optional", "Trigger that opens a matching view"],
                ],
            },
        ],
    },
    {
        id: "reveal",
        title: "Reveal hidden targets",
        variant: "reference",
        blocks: [
            { type: "paragraph", text: "Use matching data-fp-view and data-fp-open values for hidden UI, and call onNavigate first when the target is on another route." },
            { type: "list", items: ["Do not duplicate ids.", "Use stable ids instead of list indexes.", "Changing group to item can affect old markers.", "The nearest item wins inside nested ids."] },
        ],
    },
]);

const modes = makePage("modes", "MODES", "Understand Report and View mode", "Separate authoring and review so markers are not created accidentally during normal use.", [
    {
        id: "modes",
        title: "Three states",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Mode", "Select in panel", "Purpose"],
                rows: [
                    ["idle", "Default state", "Use the host application"],
                    ["report", "Add feedback", "Select an element, write feedback, use UI Edit"],
                    ["view", "View feedback", "Review markers, replies, and status"],
                ],
            },
        ],
    },
]);

const uiEdit = makePage("ui-edit", "UI EDIT", "Show intent on the live screen", "Adjust text, spacing, colors, and flex/grid alignment, then compare Before and After.", [
    {
        id: "use",
        title: "Workflow",
        variant: "quick-start",
        stepLabel: "TRY",
        blocks: [
            {
                type: "ordered",
                items: [
                    "Select an element in Report mode.",
                    "Right-click and choose Edit.",
                    "Adjust values and apply.",
                    "Compare with Before/After and Undo/Redo.",
                    "Attach the style-change summary to the draft.",
                ],
            },
            {
                type: "table",
                headers: ["Area", "Controls"],
                rows: [
                    ["Text", "textContent, fontSize, lineHeight"],
                    ["Box", "padding, margin"],
                    ["Color", "text, background, border"],
                    ["flex", "alignment, direction, gap"],
                    ["grid", "1–12 columns, gap"],
                ],
            },
        ],
    },
    {
        id: "limits",
        title: "Important limits",
        variant: "reference",
        blocks: [
            {
                type: "callout",
                variant: "warning",
                text: "Changes are inline element.style values for this tab session only. Refreshing restores the page, and the codebase is never edited automatically.",
            },
            {
                type: "list",
                items: [
                    "Text controls are hidden for non-text targets.",
                    "flex/grid controls appear only for matching display values.",
                    "Complex grid templates may be simplified.",
                    "Reset and delete can be recovered within the session.",
                ],
            },
        ],
    },
]);

const localStorageFullSetup = [
    '"use client";',
    "",
    'import { FivePixels } from "@fivepixels-js/react";',
    'import { useRouter } from "next/navigation";',
    "",
    "const reviewers = [",
    '  { id: "pm-mina", name: "Mina Kim", department: "Product", role: "admin", publicKey: "pk_pm_mina" },',
    '  { id: "qa-noah", name: "Noah Park", department: "QA", role: "sub_admin", publicKey: "pk_qa_noah" },',
    '  { id: "design-emma", name: "Emma Lee", department: "Design", role: "member", publicKey: "pk_design_emma" },',
    '  { id: "frontend-joon", name: "Joon Choi", department: "Frontend", role: "member", publicKey: "pk_frontend_joon" },',
    '  { id: "backend-sophia", name: "Sophia Han", department: "Backend", role: "member", publicKey: "pk_backend_sophia" },',
    '  { id: "client-alex", name: "Alex Morgan", department: "Client", role: "member", publicKey: "pk_client_alex" },',
    "] as const;",
    "",
    "export function FivepixelsLocalSetup() {",
    "  const router = useRouter();",
    "",
    "  return (",
    "    <FivePixels",
    '      project={{ id: "acme-web", env: "stage", version: "1.2.0" }}',
    '      sync="local"',
    '      mode="default"',
    "      visibility={{ enabled: true, devOnly: true }}",
    '      ui={{ panelAppearance: "system", locale: "en", showFeedbackList: true }}',
    "      require={{ reviewerKey: true }}",
    "      team={{ reviewers: [...reviewers] }}",
    "      fields={[",
    '        { key: "repro", type: "textarea", label: "Reproduction steps", required: true },',
    '        { key: "blocker", type: "checkbox", label: "Release blocker" },',
    "      ]}",
    "      onNavigate={(pathname) => router.push(pathname)}",
    '      onEvent={(event) => console.info("fivepixels", event)}',
    "    />",
    "  );",
    "}",
].join("\n");

const apiFullSetup = [
    '"use client";',
    "",
    'import { useMemo } from "react";',
    'import { FivePixels, type FivePixelsAdapter } from "@fivepixels-js/react";',
    'import { useRouter } from "next/navigation";',
    "",
    'const apiRoot = "/api/v1/fivepixels";',
    "const projectBase = `${apiRoot}/projects/acme-web`;",
    "",
    "const reviewers = [",
    '  { id: "pm-mina", name: "Mina Kim", department: "Product", role: "admin", publicKey: "pk_pm_mina" },',
    '  { id: "qa-noah", name: "Noah Park", department: "QA", role: "sub_admin", publicKey: "pk_qa_noah" },',
    '  { id: "design-emma", name: "Emma Lee", department: "Design", role: "member", publicKey: "pk_design_emma" },',
    '  { id: "frontend-joon", name: "Joon Choi", department: "Frontend", role: "member", publicKey: "pk_frontend_joon" },',
    '  { id: "backend-sophia", name: "Sophia Han", department: "Backend", role: "member", publicKey: "pk_backend_sophia" },',
    '  { id: "client-alex", name: "Alex Morgan", department: "Client", role: "member", publicKey: "pk_client_alex" },',
    "] as const;",
    "",
    "async function request<T>(url: string, init?: RequestInit): Promise<T> {",
    "  const response = await fetch(url, {",
    "    ...init,",
    '    headers: { "Content-Type": "application/json", ...init?.headers },',
    "  });",
    "  if (!response.ok) throw new Error(`Fivepixels API error: ${response.status}`);",
    "  if (response.status === 204) return undefined as T;",
    "  return response.json() as Promise<T>;",
    "}",
    "",
    "function createFullAdapter(): FivePixelsAdapter {",
    "  return {",
    "    auth: {",
    '      login: (payload) => request(`${apiRoot}/auth/login`, { method: "POST", body: JSON.stringify(payload) }),',
    '      logout: () => request(`${apiRoot}/auth/logout`, { method: "POST" }),',
    '      refresh: () => request(`${apiRoot}/auth/refresh`, { method: "POST" }),',
    "    },",
    "    markers: {",
    "      list: ({ pathname }) =>",
    "        request(`${projectBase}/feedbacks/markers?pathname=${encodeURIComponent(pathname)}`),",
    "    },",
    "    feedback: {",
    '      create: (payload) => request(`${projectBase}/feedbacks`, { method: "POST", body: JSON.stringify(payload) }),',
    "      getForUi: (id) => request(`${projectBase}/feedbacks/${id}/overview`),",
    '      update: (id, payload) => request(`${projectBase}/feedbacks/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),',
    "    },",
    "    cases: {",
    "      list: (feedbackId) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases`),",
    '      create: (feedbackId, payload) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases`, { method: "POST", body: JSON.stringify(payload) }),',
    '      update: (feedbackId, caseId, payload) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases/${caseId}`, { method: "PATCH", body: JSON.stringify(payload) }),',
    "    },",
    "    replies: {",
    "      list: (feedbackId, caseId) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases/${caseId}/replies`),",
    '      create: (feedbackId, caseId, payload) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases/${caseId}/replies`, { method: "POST", body: JSON.stringify(payload) }),',
    '      update: (feedbackId, caseId, replyId, payload) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases/${caseId}/replies/${replyId}`, { method: "PATCH", body: JSON.stringify(payload) }),',
    '      delete: (feedbackId, caseId, replyId) => request(`${projectBase}/feedbacks/${feedbackId}/report-cases/${caseId}/replies/${replyId}`, { method: "DELETE" }),',
    "    },",
    "    members: {",
    "      list: () => request(`${projectBase}/members`),",
    "    },",
    "  };",
    "}",
    "",
    "export function FivepixelsApiSetup() {",
    "  const router = useRouter();",
    "  const adapter = useMemo(() => createFullAdapter(), []);",
    "",
    "  return (",
    "    <FivePixels",
    '      project={{ id: "acme-web", env: "stage", version: "1.2.0" }}',
    '      sync="api"',
    "      adapter={adapter}",
    "      visibility={{ enabled: true, devOnly: true }}",
    '      ui={{ panelAppearance: "system", locale: "en", showFeedbackList: true }}',
    "      require={{ authLogin: true, reviewerKey: true }}",
    "      team={{ reviewers: [...reviewers] }}",
    "      fields={[",
    '        { key: "repro", type: "textarea", label: "Reproduction steps", required: true },',
    '        { key: "blocker", type: "checkbox", label: "Release blocker" },',
    "      ]}",
    "      onNavigate={(pathname) => router.push(pathname)}",
    '      onEvent={(event) => console.info("fivepixels", event)}',
    "      github={{",
    "        enabled: true,",
    '        modes: ["on-create", "from-list"],',
    "        onCreate: async (feedback) => {",
    '          const issue = await request<{ number: number; html_url: string }>("/api/github/issues", {',
    '            method: "POST", body: JSON.stringify(feedback),',
    "          });",
    "          return { issueNumber: issue.number, issueUrl: issue.html_url };",
    "        },",
    "      }}",
    "      networkMonitor={false}",
    "    />",
    "  );",
    "}",
].join("\n");

const storageExamples = makePage(
    "storage-settings",
    "MORE SETTINGS",
    "Storage settings and examples",
    "Save feedback in your browser, share it through your own API, or follow the upcoming Artemis72 service.",
    [
        {
            id: "storage-modes",
            title: "Pick a setup",
            variant: "quick-start",
            stepLabel: "CHOOSE",
            blocks: [
                {
                    type: "table",
                    headers: ["Option", "Choose this when", "What you need"],
                    rows: [
                        ["localStorage", "You work alone or want to try it", "No backend"],
                        ["API", "Your team needs shared feedback", "Your own backend"],
                        ["Artemis72", "You want a managed service", "Coming soon"],
                    ],
                },
                { type: "paragraph", text: "Not sure which one to choose? Start with localStorage. Move to API later when the team needs to see the same feedback across browsers." },
            ],
        },
        {
            id: "local-storage",
            title: "Use localStorage without a backend",
            variant: "quick-start",
            stepLabel: "DEFAULT",
            blocks: [
                {
                    type: "tabs",
                    tabs: [
                        {
                            label: "Quick start",
                            blocks: [
                                { type: "paragraph", text: "Add this once near the root of your app. Feedback will be saved in the current browser." },
                                { type: "codeRaw", language: "tsx", code: ["<FivePixels", '  project={{ id: "my-app" }}', "  visibility={{ devOnly: true }}", "/>"].join("\n") },
                                {
                                    type: "callout",
                                    variant: "info",
                                    text: "No API or Adapter is needed. You should see the Fivepixels button after the page loads.",
                                },
                            ],
                        },
                        {
                            label: "Build your setup",
                            blocks: [{ type: "customSetup", mode: "local" }],
                        },
                        {
                            label: "Complete example",
                            blocks: [
                                {
                                    type: "paragraph",
                                    text: "See how six reviewers, extra fields, display settings, page navigation, and events work together in a Next.js app.",
                                },
                                { type: "codeRaw", language: "tsx", code: localStorageFullSetup },
                            ],
                        },
                        {
                            label: "Project settings",
                            blocks: [
                                { type: "paragraph", text: "Keep feedback separate for each app, environment, and version." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: ["<FivePixels", '  sync="local"', "  project={{", '    id: "my-app",', '    env: "stage",', '    version: "1.2.0",', "  }}", "/>"].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "Reviewers and fields",
                            blocks: [
                                { type: "paragraph", text: "Add the people who review your app and the extra questions they should answer." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        "<FivePixels",
                                        '  sync="local"',
                                        '  project={{ id: "my-app" }}',
                                        "  fields={[",
                                        '    { key: "repro", type: "textarea", label: "Reproduction steps" },',
                                        '    { key: "blocker", type: "checkbox", label: "Release blocker" },',
                                        "  ]}",
                                        "  team={{",
                                        "    reviewers: [",
                                        '      { id: "qa-lead", name: "QA Lead", publicKey: "pk_..." },',
                                        "    ],",
                                        "  }}",
                                        "/>",
                                    ].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "Page navigation",
                            blocks: [
                                { type: "paragraph", text: "Use your app's router when a feedback item opens another page." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        "<FivePixels",
                                        '  sync="local"',
                                        '  project={{ id: "my-app" }}',
                                        "  onNavigate={(pathname) => router.push(pathname)}",
                                        "/>",
                                    ].join("\n"),
                                },
                            ],
                        },
                    ],
                },
                { type: "callout", variant: "info", text: "localStorage only saves data in the current browser. Use API mode when teammates need to see the same feedback." },
                {
                    type: "callout",
                    variant: "warning",
                    text: "visibility.devOnly hides Fivepixels in production builds. Turn it off if your staging site is built in production mode.",
                },
            ],
        },
        {
            id: "api",
            title: "Connect your API",
            variant: "reference",
            blocks: [
                {
                    type: "paragraph",
                    text: 'API mode saves feedback through your backend so the team can share it. A FivePixelsAdapter is the small connection between Fivepixels and your API. Add the three basic handlers below and use sync="api".',
                },
                {
                    type: "tabs",
                    tabs: [
                        {
                            label: "Basic setup",
                            blocks: [
                                { type: "paragraph", text: "Start with these three required functions to load, create, and update shared feedback." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        'import { useMemo } from "react";',
                                        'import { FivePixels, type FivePixelsAdapter } from "@fivepixels-js/react";',
                                        "",
                                        "function createAdapter(): FivePixelsAdapter {",
                                        '  const base = "/api/v1/fivepixels/projects/my-app";',
                                        '  const write = (method: "POST" | "PATCH", body: unknown) => ({',
                                        "    method,",
                                        '    headers: { "Content-Type": "application/json" },',
                                        "    body: JSON.stringify(body),",
                                        "  });",
                                        "",
                                        "  return {",
                                        "    markers: {",
                                        "      list: ({ pathname }) =>",
                                        "        fetch(`${base}/feedbacks/markers?pathname=${encodeURIComponent(pathname)}`)",
                                        "          .then((response) => response.json()),",
                                        "    },",
                                        "    feedback: {",
                                        "      create: (payload) =>",
                                        '        fetch(`${base}/feedbacks`, write("POST", payload))',
                                        "          .then((response) => response.json()),",
                                        "      update: (id, payload) =>",
                                        '        fetch(`${base}/feedbacks/${id}`, write("PATCH", payload))',
                                        "          .then((response) => response.json()),",
                                        "    },",
                                        "  };",
                                        "}",
                                        "",
                                        "export function App() {",
                                        "  const adapter = useMemo(() => createAdapter(), []);",
                                        "",
                                        "  return (",
                                        "    <FivePixels",
                                        '      project={{ id: "my-app", env: "stage" }}',
                                        '      sync="api"',
                                        "      adapter={adapter}",
                                        "      require={{ authLogin: false, reviewerKey: false }}",
                                        "    />",
                                        "  );",
                                        "}",
                                    ].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "Build your setup",
                            blocks: [{ type: "customSetup", mode: "api" }],
                        },
                        {
                            label: "Complete example",
                            blocks: [
                                {
                                    type: "paragraph",
                                    text: "See one complete example with company login, six reviewers, extra fields, page navigation, GitHub, events, and network privacy settings.",
                                },
                                { type: "codeRaw", language: "tsx", code: apiFullSetup },
                            ],
                        },
                    ],
                },
                { type: "callout", variant: "warning", text: "Create the Adapter once with useMemo or outside the component. Creating it again on every render can repeat requests." },
            ],
        },
        {
            id: "api-recipes",
            title: "More API examples",
            variant: "reference",
            blocks: [
                { type: "subheading", text: "Choose how reviewers sign in" },
                {
                    type: "tabs",
                    tabs: [
                        {
                            label: "Company login",
                            blocks: [
                                { type: "paragraph", text: "API sharing asks reviewers to sign in by default. Add auth.login to the Adapter above." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        "const adapterWithLogin: FivePixelsAdapter = {",
                                        "  ...createAdapter(),",
                                        "  auth: {",
                                        "    login: async (credentials) => {",
                                        '      const response = await fetch("/api/v1/fivepixels/auth/login", {',
                                        '        method: "POST",',
                                        '        headers: { "Content-Type": "application/json" },',
                                        "        body: JSON.stringify(credentials),",
                                        "      });",
                                        '      if (!response.ok) throw new Error("Login failed");',
                                        "      return response.json();",
                                        "    },",
                                        "  },",
                                        "};",
                                        "",
                                        '<FivePixels sync="api" adapter={adapterWithLogin} />',
                                    ].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "No login",
                            blocks: [
                                { type: "paragraph", text: "Turn off both sign-in checks when anyone with the staging link may leave feedback." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: ["<FivePixels", '  sync="api"', "  require={{ authLogin: false, reviewerKey: false }}", "  adapter={adapter}", "/>"].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "Reviewer key",
                            blocks: [
                                { type: "paragraph", text: "Use a reviewer key when each person needs a stable name but your app has no company login." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        "<FivePixels",
                                        '  sync="api"',
                                        "  require={{ authLogin: false, reviewerKey: true }}",
                                        "  team={{",
                                        "    reviewers: [",
                                        '      { id: "qa-lead", name: "QA Lead", publicKey: "pk_..." },',
                                        "    ],",
                                        "  }}",
                                        "  adapter={adapter}",
                                        "/>",
                                    ].join("\n"),
                                },
                            ],
                        },
                    ],
                },
                { type: "subheading", text: "Connect your team tools" },
                {
                    type: "tabs",
                    tabs: [
                        {
                            label: "Notifications and GitHub",
                            blocks: [
                                { type: "paragraph", text: "Run your code when feedback changes, and send selected work to a GitHub Issue." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: [
                                        "<FivePixels",
                                        '  sync="api"',
                                        "  adapter={adapter}",
                                        '  onEvent={(event) => console.info("fivepixels", event)}',
                                        "  github={{",
                                        "    enabled: true,",
                                        '    modes: ["from-list"],',
                                        "    onCreate: async (feedback) => {",
                                        '      const response = await fetch("/api/github/issues", {',
                                        '        method: "POST",',
                                        "        body: JSON.stringify(feedback),",
                                        "      });",
                                        "      const issue = await response.json();",
                                        "      return { issueNumber: issue.number, issueUrl: issue.html_url };",
                                        "    },",
                                        "  }}",
                                        "/>",
                                    ].join("\n"),
                                },
                            ],
                        },
                        {
                            label: "Page navigation",
                            blocks: [
                                { type: "paragraph", text: "Connect your router so a feedback item can open the page where it was created." },
                                {
                                    type: "codeRaw",
                                    language: "tsx",
                                    code: ["const router = useRouter();", "", "<FivePixels", '  sync="api"', "  adapter={adapter}", "  onNavigate={(pathname) => router.push(pathname)}", "/>"].join(
                                        "\n",
                                    ),
                                },
                            ],
                        },
                        {
                            label: "Keep requests private",
                            blocks: [
                                { type: "paragraph", text: "Turn off network capture when Fivepixels should not inspect your app's requests." },
                                { type: "codeRaw", language: "tsx", code: ["<FivePixels", '  sync="api"', "  adapter={adapter}", "  networkMonitor={false}", "/>"].join("\n") },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: "migration",
            title: "Share existing feedback with your team",
            variant: "reference",
            blocks: [
                {
                    type: "paragraph",
                    text: "Keep the same project id when you move from localStorage to API. Choose the environment and version together so everyone sees the expected feedback.",
                },
                {
                    type: "codeRaw",
                    language: "tsx",
                    code: [
                        "// Before: feedback stays in this browser.",
                        '<FivePixels project={{ id: "my-app" }} sync="local" />',
                        "",
                        "// After: new feedback uses your shared API.",
                        "<FivePixels",
                        '  project={{ id: "my-app", env: "stage", version: "1.3.0" }}',
                        '  sync="api"',
                        "  adapter={adapter}",
                        "/>",
                    ].join("\n"),
                },
                {
                    type: "callout",
                    variant: "warning",
                    text: "Switching to API does not copy old browser feedback automatically. Move it with JSON Export/Import, or create it again in the shared API.",
                },
            ],
        },
        {
            id: "artemis72",
            title: "Required API functions",
            variant: "reference",
            blocks: [
                { type: "callout", variant: "info", text: "Artemis72 is a planned hosted service for Fivepixels. It is still in preparation, so setup code is not available yet." },
                { type: "subheading", text: "Required API functions" },
                {
                    type: "ordered",
                    items: ["markers.list({ pathname }) returns ReportFeedback[].", "feedback.create(payload) returns ReportFeedback with a server id.", "Implement feedback.update or cases.update."],
                },
                {
                    type: "table",
                    headers: ["Function", "What it does"],
                    rows: [
                        ["markers.list", "Required for markers on the current pathname"],
                        ["feedback.create", "Required to persist new feedback"],
                        ["feedback.update or cases.update", "At least one update path is required"],
                        ["auth · replies · members · session", "Optional extensions based on your workflow"],
                    ],
                },
                {
                    type: "callout",
                    variant: "info",
                    text: "For a shared API without login, set require={{ authLogin: false, reviewerKey: false }}. Authentication handlers are not used in this mode.",
                },
                {
                    type: "paragraph",
                    text: "You build and run the API routes, database, sign-in, and permissions. Fivepixels connects to them through the frontend Adapter.",
                },
            ],
        },
    ],
);

const authTeam = makePage("auth-and-team", "AUTH & TEAM", "Configure identity and reviewers", "Choose who may create and reply when remote sync is enabled.", [
    {
        id: "concepts",
        title: "Core concepts",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Concept", "Meaning"],
                rows: [
                    ["require.authLogin", "Require login for remote sync; default true"],
                    ["require.reviewerKey", "Match reviewer public and private keys"],
                    ["team.reviewers", "Reviewer roster and public keys"],
                    ["team.user", "Legacy; do not use in new examples"],
                    ["Private key", "ECDSA P-256 generated and rotated in settings"],
                    ["adapter.auth", "login, signup, logout, refresh, artemisLogin"],
                ],
            },
        ],
    },
]);

const github = makePage("github", "GITHUB", "Promote feedback to an Issue", "Send only implementation work that needs repository tracking.", [
    {
        id: "setup",
        title: "Configuration",
        variant: "reference",
        blocks: [
            { type: "codeRaw", language: "tsx", code: 'github={{\n  enabled: true,\n  modes: ["on-create", "from-list"],\n  onCreate: async (feedback) => ({ issueNumber, issueUrl }),\n}}' },
            {
                type: "table",
                headers: ["Mode", "Behavior"],
                rows: [
                    ["on-create", "Offer Issue creation after submit"],
                    ["from-list", "Send from the feedback list"],
                ],
            },
            { type: "paragraph", text: "After creation, status becomes git_issued and a system reply stores the link. onEvent emits feedback:github-issue-created." },
        ],
    },
]);

const panelTabs = makePage("panel-and-tabs", "PANEL & TABS", "Configure the panel for each role", "Separate stable and experimental tabs, and fetch all-page data only when needed.", [
    {
        id: "tabs",
        title: "Available tabs",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Status", "Tabs"],
                rows: [
                    ["Stable", "route-details, feedback-list, memo-list, diagnostics, api-flow"],
                    ["Experimental", "overview, my-tasks, page-brief, needs-attention, project-health, today-digest"],
                ],
            },
            { type: "callout", variant: "info", text: "overview, my-tasks, needs-attention, project-health, and today-digest require listAll and fetch when the tab activates." },
        ],
    },
    {
        id: "layout",
        title: "Panel UI",
        variant: "reference",
        blocks: [{ type: "list", items: ["Left/right docking and resize", "Role and tab onboarding", "presentation mode", "Notifications and minimized dock", "networkMonitor-backed API flow tab"] }],
    },
]);

const mentions = makePage("mentions-and-thread", "THREADS & MENTIONS", "Connect elements and people", "Use cases and nested replies to keep independent requests separate inside one feedback item.", [
    {
        id: "model",
        title: "Conversation model",
        variant: "reference",
        blocks: [
            {
                type: "list",
                items: [
                    "Case text, assignee, and open/resolved status",
                    "suggested, additional_question, found_error, recheck_requested, resolved reply states",
                    "Nested replies through parent_reply_id",
                    "Element and user mentions",
                    "user, manager, system author types",
                    "GitHub Issue system entries",
                ],
            },
            { type: "callout", variant: "info", text: "Label experimental UI such as Ask AI separately from stable features." },
        ],
    },
]);

const importExport = makePage("import-export", "IMPORT & EXPORT", "Move local data as JSON", "Import and export suit local-mode backup and manual transfer.", [
    {
        id: "features",
        title: "Supported operations",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Operation", "Purpose"],
                rows: [
                    ["Export", "Download the current project scope"],
                    ["Import", "Choose or drag a JSON file"],
                    ["Command", "Paste JSON to replace or merge"],
                ],
            },
            { type: "list", items: ["Confirm project mismatches.", "Confirm replacement on id collisions.", "Validate with validateFeedbackImport.", "Use an API Adapter for live team sharing."] },
        ],
    },
]);

const customUi = makePage("custom-ui", "CUSTOM UI", "Compose with providers and hooks", "Use public subpaths when the default panel does not fit the host product.", [
    {
        id: "imports",
        title: "Public subpaths",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["import", "Purpose"],
                rows: [
                    ["@fivepixels-js/react", "FivePixels, types, utilities"],
                    ["@fivepixels-js/react/report", "Provider, hooks, custom composition"],
                    ["@fivepixels-js/react/demo", "Demo runtime"],
                ],
            },
        ],
    },
    {
        id: "hooks",
        title: "Hook partitions",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Hook", "Purpose"],
                rows: [
                    ["useReport()", "Full backward-compatible API"],
                    ["useReportPreferences()", "appearance, locale, role, messages"],
                    ["useReportSession()", "mode, draft, markers, composers"],
                    ["useReportData()", "lists, filters, CRUD, stats, replies"],
                ],
            },
        ],
    },
]);

const api = makePage("api", "API REFERENCE", "FivePixels Props at a glance", "Find frequently used Props and Adapter domains in one place.", [
    {
        id: "props",
        title: "Props",
        variant: "reference",
        blocks: [
            {
                type: "table",
                headers: ["Prop", "Purpose"],
                rows: [
                    ["project", "id, env, version data scope"],
                    ["ui", "appearance, locale, messages, and list UI"],
                    ["visibility", "enabled, devOnly, routeKey"],
                    ["team", "reviewers and legacy user"],
                    ["mode", "default or presentation"],
                    ["sync", "local, api, artemis"],
                    ["require", "authLogin, reviewerKey"],
                    ["adapter", "Remote handler bundle"],
                    ["fields", "textarea and checkbox fields"],
                    ["onNavigate", "Navigate from View mode"],
                    ["onEvent / onReply", "Event and reply side effects"],
                    ["github", "Issue creation"],
                    ["networkMonitor", "API flow capture; default true"],
                ],
            },
            { type: "callout", variant: "warning", text: "requireAuth is deprecated. Use require.authLogin." },
        ],
    },
    {
        id: "adapter",
        title: "Adapter domains",
        variant: "reference",
        blocks: [
            { type: "codeRaw", language: "text", code: "auth · session · markers · feedback · cases · replies · members" },
            { type: "paragraph", text: "Use the package types FivePixelsProps, FivePixelsAdapter, and ReportFeedback/ReportCase/ReportReply as the source of truth." },
        ],
    },
    {
        id: "more",
        title: "More settings and examples",
        variant: "reference",
        blocks: [{ type: "actions", links: [
            { href: "/docs/storage-settings", label: "Storage examples" },
            { href: "/docs/modes", label: "Report and View" },
            { href: "/docs/panel-and-tabs", label: "Panel and tabs" },
            { href: "/docs/mentions-and-thread", label: "Replies and mentions" },
            { href: "/docs/import-export", label: "Import and export feedback" },
            { href: "/docs/custom-ui", label: "Build your own UI" },
        ] }],
    },
]);

const edgeCases = makePage("edge-cases", "HELP", "Troubleshooting", "Start with the problem you see on the page.", [
    {
        id: "button",
        title: "The Fivepixels button does not appear",
        variant: "reference",
        blocks: [
            { type: "list", items: ["Make sure FivePixels is included in the page you opened.", 'In Next.js, put FivePixels in a file with "use client" at the top.', "If you set visibility.devOnly to true, the button is hidden in production builds. This also applies to staging sites built in production mode."] },
            { type: "link", href: "/docs/setup", label: "Check the installation steps" },
        ],
    },
    {
        id: "sharing",
        title: "My teammate cannot see my feedback",
        variant: "reference",
        blocks: [
            { type: "paragraph", text: "localStorage only saves feedback in your current browser. For shared feedback, connect your API and use the same project id, environment, and version across the team." },
            { type: "link", href: "/docs/api-connection", label: "Connect your API" },
        ],
    },
    {
        id: "locations",
        title: "A marker is missing or in the wrong place",
        variant: "reference",
        blocks: [
            { type: "list", items: ["Give the element a stable, unique data-report-id. Avoid list indexes.", "If the element is inside a closed modal or tab, Fivepixels needs to know how to open it.", "For feedback on another page, connect onNavigate to your app's router."] },
            { type: "link", href: "/docs/dom-attributes", label: "Set up feedback locations" },
        ],
    },
    {
        id: "api",
        title: "Feedback does not save through my API",
        variant: "reference",
        blocks: [
            { type: "list", items: ["Check that your server can load, create, and update feedback.", "Check the failed request in your browser's Network tab.", "Create the adapter once with useMemo or outside the component."] },
            { type: "link", href: "/docs/storage-settings#api", label: "Check the API example" },
        ],
    },
]);

const apiSection = storageExamples.sections.find((section) => section.id === "api")!;
const apiTabs = apiSection.blocks.find((block) => block.type === "tabs")!;

const localStorage = makePage("local-storage", "STORAGE", "Save in this browser", "localStorage is the default. You can try Fivepixels without running a server.", [
    {
        id: "local-storage",
        title: "No extra setup needed",
        variant: "quick-start",
        stepLabel: "LOCALSTORAGE",
        blocks: [
            { type: "codeRaw", language: "tsx", code: '<FivePixels project={{ id: "my-app" }} />' },
            { type: "paragraph", text: "Feedback stays in this browser after a refresh. Other browsers and teammates will not see it, and clearing the site data removes it." },
            { type: "link", href: "/docs/storage-settings#local-storage", label: "Need more settings?" },
        ],
    },
]);

const apiConnection = makePage("api-connection", "STORAGE", "Connect your API", "Save feedback on your own server so your team can see and review it together.", [
    {
        id: "before-you-start",
        title: "What you need",
        variant: "quick-start",
        stepLabel: "API",
        blocks: [
            { type: "paragraph", text: "You need a server and database that can load, save, and update feedback. The URLs below are examples; create matching routes on your server or use your own URLs." },
            { type: "paragraph", text: "FivePixelsAdapter connects Fivepixels to those routes. This example uses your API without a login step. You can connect login later." },
        ],
    },
    {
        ...apiSection,
        blocks: [
            ...apiTabs.tabs[0].blocks,
            { type: "callout", variant: "info", text: "Keep the same project id for everyone reviewing this app. Use useMemo as shown so the API connection is not recreated on every render." },
            { type: "link", href: "/docs/storage-settings#api", label: "More API settings and examples" },
        ],
    },
    {
        id: "requirements",
        title: "What your API needs to do",
        variant: "reference",
        blocks: storageExamples.sections.find((section) => section.id === "artemis72")!.blocks.slice(1),
    },
    storageExamples.sections.find((section) => section.id === "migration")!,
]);

const artemis72 = makePage("artemis72", "STORAGE", "Artemis72", "A planned hosted service for saving and sharing Fivepixels feedback.", [
    {
        id: "artemis72",
        title: "Coming soon",
        variant: "reference",
        blocks: [
            { type: "paragraph", text: "Artemis72 is still being built. There is no setup to complete yet." },
            { type: "actions", links: [
                { href: "/docs/local-storage", label: "Try localStorage", description: "Start in this browser without a server" },
                { href: "/docs/api-connection", label: "Connect your API", description: "Use your own server for team feedback" },
            ] },
        ],
    },
]);

const persistence = makePage("persistence", "STORAGE", "Where feedback is saved", "Start in your browser. Connect your API when you need shared feedback. Artemis72 is coming later.", [
    {
        ...storageExamples.sections[0],
        title: "Three storage modes",
    },
    ...[
        { id: "local-storage", title: "localStorage", text: "The default. Save feedback in the current browser without a server.", href: "/docs/local-storage", label: "Use localStorage" },
        { id: "api", title: "API", text: "Save and share feedback through your own server.", href: "/docs/api-connection", label: "Connect your API" },
        { id: "artemis72", title: "Artemis72 — coming soon", text: "Our planned hosted service. Setup is not available yet.", href: "/docs/artemis72", label: "About Artemis72" },
    ].map((mode): GuideSection => ({
        id: mode.id, title: mode.title, variant: "reference",
        blocks: [{ type: "paragraph", text: mode.text }, { type: "link", href: mode.href, label: mode.label }],
    })),
]);

// Keep detailed examples available without putting them in the first-run path.
const storageSettings: GuidePageMessages = {
    ...storageExamples,
    sections: storageExamples.sections
        .filter((section) => !["storage-modes", "migration", "artemis72"].includes(section.id))
        .map((section) => section.id === "local-storage" ? {
            ...section,
            blocks: section.blocks.map((block) => block.type === "tabs" ? {
                ...block,
                tabs: block.tabs.filter((tab) => tab.label !== "Quick start"),
            } : block),
        } : section),
};

export const docsEn: GuideCollectionMessages = {
    title: "Docs",
    description: "Install Fivepixels, leave your first feedback, and share it when you are ready.",
    basePath: "/docs",
    navHome: "Home",
    codeCopy: "Copy",
    codeCopied: "Copied",
    onThisPage: "On this page",
    navGroups: [
        { label: "Getting started", items: [
            { slug: "setup", label: "Install Fivepixels" },
            { slug: "quickstart", label: "Your first feedback" },
        ] },
        { label: "Storage", items: [
            { slug: "local-storage", label: "localStorage" },
            { slug: "api-connection", label: "API" },
            { slug: "artemis72", label: "Artemis72 — coming soon" },
        ] },
        { label: "Working together", items: [
            { slug: "workflow", label: "Review with your team" },
            { slug: "client", label: "Ask a client to review" },
        ] },
        { label: "Help", items: [
            { slug: "faq", label: "Frequently asked questions" },
            { slug: "edge-cases", label: "Troubleshooting" },
        ] },
        { label: "More settings", items: [
            { slug: "dom-attributes", label: "Feedback locations" },
            { slug: "ui-edit", label: "Preview UI changes" },
            { slug: "auth-and-team", label: "Connect login" },
            { slug: "github", label: "Connect GitHub" },
            { slug: "api", label: "All settings and API" },
        ] },
    ],
    pages: {
        setup,
        react: { ...react, navigation: { previous: "setup", next: "quickstart" } },
        nextjs: { ...nextjs, navigation: { previous: "setup", next: "quickstart" } },
        quickstart: { ...quickstart, navigation: { previous: "setup", next: "workflow" } },
        workflow: { ...workflow, navigation: { previous: "quickstart", next: "client" } },
        client: { ...client, navigation: { previous: "workflow", next: "faq" } },
        faq: { ...faq, navigation: { previous: "client", next: "edge-cases" } },
        persistence: { ...persistence, navigation: { previous: "quickstart" } },
        "local-storage": { ...localStorage, navigation: { previous: "persistence", next: "quickstart" } },
        "api-connection": { ...apiConnection, navigation: { previous: "persistence", next: "workflow" } },
        artemis72: { ...artemis72, navigation: { previous: "persistence" } },
        "storage-settings": { ...storageSettings, navigation: { previous: "persistence" } },
        "dom-attributes": { ...domAttributes, navigation: { previous: "edge-cases", next: "ui-edit" } },
        modes: { ...modes, navigation: { previous: "api", next: "panel-and-tabs" } },
        "ui-edit": { ...uiEdit, navigation: { previous: "dom-attributes", next: "auth-and-team" } },
        "auth-and-team": { ...authTeam, navigation: { previous: "ui-edit", next: "github" } },
        github: { ...github, navigation: { previous: "auth-and-team", next: "api" } },
        "panel-and-tabs": { ...panelTabs, navigation: { previous: "modes", next: "mentions-and-thread" } },
        "mentions-and-thread": { ...mentions, navigation: { previous: "panel-and-tabs", next: "import-export" } },
        "import-export": { ...importExport, navigation: { previous: "mentions-and-thread", next: "custom-ui" } },
        "custom-ui": { ...customUi, navigation: { previous: "import-export", next: "api" } },
        api: { ...api, navigation: { previous: "github" } },
        "edge-cases": { ...edgeCases, navigation: { previous: "faq", next: "dom-attributes" } },
    },
};

// Compatibility for the existing guide component message key.
export const guidesEn = docsEn;
