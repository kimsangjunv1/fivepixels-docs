"use client";

import dynamic from "next/dynamic";
import { useMemo, type ReactNode } from "react";
import { useMessages } from "@/shared/i18n/useMessages";

const FivePixels = dynamic(() => import("@fivepixels-js/react").then((mod) => mod.FivePixels), { ssr: false });

type FivePixelsProviderProps = {
    children: ReactNode;
};

export function FivePixelsProvider({ children }: FivePixelsProviderProps) {
    const fivePixels = useMessages().example.fivePixels;

    const fields = useMemo(
        () => [
            { key: "message", type: "textarea" as const, label: fivePixels.messageLabel, required: true },
            { key: "isBug", type: "checkbox" as const, label: fivePixels.bugLabel },
            { key: "isImportant", type: "checkbox" as const, label: fivePixels.importantLabel },
        ],
        [fivePixels.bugLabel, fivePixels.importantLabel, fivePixels.messageLabel],
    );

    const ui = useMemo(
        () => ({
            locale: "en" as const,
            appearance: "system" as const,
            showFeedbackList: true,
        }),
        [],
    );

    return (
        <>
            <FivePixels
                project={{ id: "example-01", env: "demo" }}
                ui={ui}
                visibility={{ devOnly: false }}
                team={{
                    user: { id: "demo-user", name: "Demo User" },
                    reviewers: [
                        { id: "1", name: "Reviewer A" },
                        { id: "2", name: "Reviewer B" },
                    ],
                }}
                fields={fields}
            />
            {children}
        </>
    );
}
