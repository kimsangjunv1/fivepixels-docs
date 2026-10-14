import type { ReactNode } from "react";
import { FivePixelsProvider } from "@/features/reviewDemo/ui/FivePixelsProvider";
import { DashboardShell } from "@/features/reviewDemo/ui/DashboardShell";

export function Example01Layout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <FivePixelsProvider>
            <div className="h-dvh overflow-hidden bg-[var(--adaptive-background)] font-[family-name:var(--font-inter)] text-[18px] text-[var(--adaptive-text-primary)]">
                <DashboardShell>{children}</DashboardShell>
            </div>
        </FivePixelsProvider>
    );
}
