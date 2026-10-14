"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

type SetupMode = "local" | "api";
type ReviewerCount = 1 | 2 | 3;
type Theme = "system" | "dark" | "light";
type FeatureKey = "fields" | "reviewerKey" | "navigation" | "events" | "github" | "networkPrivacy";

type SetupOptions = {
    mode: SetupMode;
    reviewerCount: ReviewerCount;
    includeInitialSetup: boolean;
    theme: Theme;
    features: Record<FeatureKey, boolean>;
};

const REVIEWERS = [
    { id: "pm-mina", name: "Mina Kim", department: "Product", role: "admin", publicKey: "pk_pm_mina" },
    { id: "qa-noah", name: "Noah Park", department: "QA", role: "sub_admin", publicKey: "pk_qa_noah" },
    { id: "design-emma", name: "Emma Lee", department: "Design", role: "member", publicKey: "pk_design_emma" },
] as const;

const SHARED_FEATURES: { key: FeatureKey; label: string; description: string }[] = [
    { key: "fields", label: "Extra questions", description: "Ask for steps to reproduce the issue and whether it blocks a release." },
    { key: "reviewerKey", label: "Reviewer key", description: "Give each reviewer a personal key." },
    { key: "navigation", label: "Page navigation", description: "Open the right page when someone selects feedback." },
    { key: "events", label: "Send app events", description: "Run your code when feedback is created, updated, or replied to." },
];

const API_FEATURES: { key: FeatureKey; label: string; description: string }[] = [
    { key: "github", label: "GitHub Issues", description: "Promote feedback to an Issue from the panel." },
    { key: "networkPrivacy", label: "Keep network requests private", description: "Stop Fivepixels from inspecting your app's network requests." },
];

const INITIAL_FEATURES: Record<FeatureKey, boolean> = {
    fields: true,
    reviewerKey: true,
    navigation: true,
    events: true,
    github: false,
    networkPrivacy: false,
};

function buildReviewerLines(count: ReviewerCount) {
    return REVIEWERS.slice(0, count).map(
        (reviewer) =>
            `  { id: "${reviewer.id}", name: "${reviewer.name}", department: "${reviewer.department}", role: "${reviewer.role}", publicKey: "${reviewer.publicKey}" },`,
    );
}

function buildCustomSetupCode({ mode, reviewerCount, includeInitialSetup, theme, features }: SetupOptions) {
    const lines = ['"use client";', "", 'import { FivePixels } from "@fivepixels-js/react";'];
    if (features.navigation) lines.push('import { useRouter } from "next/navigation";');
    if (mode === "api") lines.push('import { adapter } from "./fivepixels-adapter";');
    if (mode === "api" && features.github) lines.push('import { createGitHubIssue } from "./github";');

    lines.push("", "const reviewers = [", ...buildReviewerLines(reviewerCount), "] as const;");

    const componentName = mode === "local" ? "FivepixelsLocalCustomSetup" : "FivepixelsApiCustomSetup";
    lines.push("", `export function ${componentName}() {`);
    if (features.navigation) lines.push("  const router = useRouter();");
    lines.push("", "  return (", "    <FivePixels");

    if (includeInitialSetup) {
        lines.push('      project={{ id: "acme-web", env: "stage", version: "1.2.0" }}');
    }

    lines.push(`      sync="${mode}"`);
    if (mode === "api") lines.push("      adapter={adapter}");
    if (includeInitialSetup) lines.push("      visibility={{ enabled: true, devOnly: true }}");
    lines.push(`      ui={{ panelAppearance: "${theme}", tooltipAppearance: "${theme}", locale: "en", showFeedbackList: true }}`);

    if (mode === "api") {
        lines.push(`      require={{ authLogin: false, reviewerKey: ${features.reviewerKey} }}`);
    } else if (features.reviewerKey) {
        lines.push("      require={{ reviewerKey: true }}");
    }

    lines.push("      team={{ reviewers: [...reviewers] }}");

    if (features.fields) {
        lines.push(
            "      fields={[",
            '        { key: "repro", type: "textarea", label: "Reproduction steps", required: true },',
            '        { key: "blocker", type: "checkbox", label: "Release blocker" },',
            "      ]}",
        );
    }
    if (features.navigation) lines.push("      onNavigate={(pathname) => router.push(pathname)}");
    if (features.events) lines.push('      onEvent={(event) => console.info("fivepixels", event)}');
    if (mode === "api" && features.github) {
        lines.push('      github={{ enabled: true, modes: ["from-list"], onCreate: createGitHubIssue }}');
    }
    if (mode === "api" && features.networkPrivacy) lines.push("      networkMonitor={false}");

    lines.push("    />", "  );", "}");
    return lines.join("\n");
}

function SegmentedChoice<T extends string | number>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: readonly { label: string; value: T }[];
    value: T;
    onChange: (value: T) => void;
}) {
    return (
        <fieldset>
            <legend className="mb-[1.2rem] text-[1.3rem] font-medium text-[var(--adaptive-text-primary)]">{label}</legend>
            <div className="grid grid-cols-3 gap-[0.4rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] p-[0.4rem]">
                {options.map((option) => (
                    <label key={option.value} className="cursor-pointer">
                        <input
                            type="radio"
                            name={label}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="peer sr-only"
                        />
                        <span className="grid min-h-[3.8rem] place-items-center rounded-[0.6rem] px-[1rem] text-center text-[1.3rem] font-medium text-[var(--adaptive-text-muted)] transition-colors peer-checked:bg-[var(--adaptive-surface)] peer-checked:text-[var(--adaptive-text-primary)] peer-checked:shadow-[var(--adaptive-popup-shadow)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--adaptive-accent-coral)]">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

export function CustomSetupBuilder({ mode }: { mode: SetupMode }) {
    const [reviewerCount, setReviewerCount] = useState<ReviewerCount>(3);
    const [includeInitialSetup, setIncludeInitialSetup] = useState(true);
    const [theme, setTheme] = useState<Theme>("system");
    const [features, setFeatures] = useState(INITIAL_FEATURES);
    const availableFeatures = mode === "api" ? [...SHARED_FEATURES, ...API_FEATURES] : SHARED_FEATURES;
    const code = buildCustomSetupCode({ mode, reviewerCount, includeInitialSetup, theme, features });

    const toggleFeature = (key: FeatureKey) => {
        setFeatures((current) => ({ ...current, [key]: !current[key] }));
    };

    return (
        <div className="space-y-[2.4rem]">
            <div className="grid gap-[2rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] p-[1.6rem] tablet:grid-cols-2 tablet:p-[2.4rem]">
                <SegmentedChoice
                    label="Reviewers"
                    value={reviewerCount}
                    options={[
                        { label: "1 person", value: 1 },
                        { label: "2 people", value: 2 },
                        { label: "3 people", value: 3 },
                    ]}
                    onChange={setReviewerCount}
                />
                <SegmentedChoice
                    label="Theme"
                    value={theme}
                    options={[
                        { label: "Auto", value: "system" },
                        { label: "Dark", value: "dark" },
                        { label: "Light", value: "light" },
                    ]}
                    onChange={setTheme}
                />
                <label className="flex cursor-pointer items-start gap-[1.2rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[1.4rem] tablet:col-span-2">
                    <input
                        type="checkbox"
                        checked={includeInitialSetup}
                        onChange={(event) => setIncludeInitialSetup(event.target.checked)}
                        className="mt-[0.2rem] size-[1.6rem] accent-[var(--adaptive-accent-coral)]"
                    />
                    <span>
                        <span className="block text-[1.35rem] font-medium text-[var(--adaptive-text-primary)]">Add recommended project settings</span>
                        <span className="mt-[0.4rem] block text-[1.2rem] leading-[1.45] text-[var(--adaptive-text-muted)]">Add an app id, staging name, version, and live-site visibility setting.</span>
                    </span>
                </label>
                <fieldset className="grid gap-[0.8rem] tablet:col-span-2 tablet:grid-cols-2">
                    <legend className="mb-[0.4rem] text-[1.3rem] font-medium text-[var(--adaptive-text-primary)]">Add features</legend>
                    {availableFeatures.map((feature) => (
                        <label key={feature.key} className="flex cursor-pointer items-start gap-[1.2rem] rounded-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[1.4rem]">
                            <input
                                type="checkbox"
                                checked={features[feature.key]}
                                onChange={() => toggleFeature(feature.key)}
                                className="mt-[0.2rem] size-[1.6rem] accent-[var(--adaptive-accent-coral)]"
                            />
                            <span>
                                <span className="block text-[1.3rem] font-medium text-[var(--adaptive-text-primary)]">{feature.label}</span>
                                <span className="mt-[0.3rem] block text-[1.15rem] leading-[1.45] text-[var(--adaptive-text-muted)]">{feature.description}</span>
                            </span>
                        </label>
                    ))}
                </fieldset>
            </div>
            <CodeBlock code={code} language="tsx" />
        </div>
    );
}
