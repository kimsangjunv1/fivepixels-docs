"use client";

import { useMessages } from "@/shared/i18n/useMessages";

const toggleIds = ["notifications", "markers"] as const;

export function SettingsHeading() {
    const settings = useMessages().example.settings;

    return (
        <header
            className="flex flex-col gap-[0.8rem]"
            data-report-id="example-settings-header"
            data-report-type="group"
        >
            <p className="font-[family-name:var(--font-inter)] text-[1.2rem] text-[var(--adaptive-text-muted)]">{settings.eyebrow}</p>
            <h1
                className="text-[2.8rem] font-semibold"
                data-report-id="example-settings-title"
            >
                {settings.title}
            </h1>
            <p
                className="max-w-[64rem] text-[1.5rem] leading-[1.6] text-[var(--adaptive-text-secondary)]"
                data-report-id="example-settings-description"
            >
                {settings.description}
            </p>
        </header>
    );
}

export function WorkspaceSettings() {
    const settings = useMessages().example.settings;

    return (
        <div
            className="flex flex-col gap-[1.6rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-[2rem]"
            data-report-id="example-settings-panel"
            data-report-type="group"
        >
            {settings.toggles.map((setting, index) => {
                const id = toggleIds[index];

                return (
                    <label
                        className="flex items-start justify-between gap-[1.6rem] border-b border-[var(--adaptive-border)] pb-[1.6rem] last:border-0 last:pb-0"
                        data-report-id={`example-settings-row-${id}`}
                        key={id}
                    >
                        <span>
                            <span
                                className="block text-[1.5rem] font-medium"
                                data-report-id={`example-settings-label-${id}`}
                            >
                                {setting.label}
                            </span>
                            <span
                                className="mt-[0.4rem] block text-[1.3rem] text-[var(--adaptive-text-muted)]"
                                data-report-id={`example-settings-desc-${id}`}
                            >
                                {setting.description}
                            </span>
                        </span>
                        <input
                            className="mt-[0.4rem] h-[1.8rem] w-[1.8rem] accent-[#1e293b]"
                            data-report-id={`example-settings-toggle-${id}`}
                            defaultChecked
                            type="checkbox"
                        />
                    </label>
                );
            })}

            <label
                className="flex flex-col gap-[0.8rem] text-[1.4rem]"
                data-report-id="example-settings-webhook"
            >
                <span className="font-medium">{settings.webhookLabel}</span>
                <input
                    className="border border-[var(--adaptive-border)] px-[1.2rem] py-[1rem] text-[1.4rem] outline-none focus:border-[var(--adaptive-text-primary)]"
                    data-report-id="example-settings-webhook-input"
                    placeholder={settings.webhookPlaceholder}
                    type="url"
                />
            </label>

            <button
                className="w-max bg-[#1e293b] px-[1.4rem] py-[1rem] text-[1.3rem] text-white"
                data-report-id="example-settings-save"
                type="button"
            >
                {settings.save}
            </button>
        </div>
    );
}
