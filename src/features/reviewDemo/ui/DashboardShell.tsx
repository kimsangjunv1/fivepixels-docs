"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { MaterialIcon } from "@/shared/ui/MaterialIcon";
import { useMessages } from "@/shared/i18n/useMessages";
import { CreateIssueModal } from "@/features/reviewDemo/ui/CreateIssueModal";
import { ModalLabModals } from "@/features/reviewDemo/ui/ModalLabModals";
import { DASHBOARD_NAV_ITEMS, isDashboardNavActive } from "@/features/reviewDemo/model/dashboardNav";

type DashboardShellProps = {
    children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname();
    const { shell, nav } = useMessages().example;
    const [createIssueOpen, setCreateIssueOpen] = useState(false);

    const openCreateIssue = useCallback(() => setCreateIssueOpen(true), []);
    const closeCreateIssue = useCallback(() => setCreateIssueOpen(false), []);

    useEffect(() => {
        if (!createIssueOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeCreateIssue();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeCreateIssue, createIssueOpen]);

    return (
        <>
            <Link
                className="fixed left-1/2 top-[1.6rem] z-[80] flex -translate-x-1/2 items-center gap-[0.8rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] px-[1.6rem] py-[1rem] text-[1.3rem] font-medium shadow-[var(--adaptive-popup-shadow)] transition-colors hover:border-[var(--adaptive-grey400)] hover:bg-[var(--adaptive-grey50)]"
                data-report-id="example-dashboard-back"
                href="/"
            >
                <ArrowLeft size={16} />
                {shell.backLink}
            </Link>

            <div
                className="flex h-dvh flex-col overflow-hidden bg-[var(--adaptive-background)]"
                data-report-id="example-dashboard-root"
                data-report-type="group"
            >
                <div className="flex min-h-0 flex-1 flex-col tablet:flex-row">
                    <aside
                        className="flex w-full shrink-0 flex-col justify-between overflow-y-auto bg-[#1e293b] p-[2rem] text-white tablet:w-[22rem]"
                        data-report-id="example-dashboard-sidebar"
                        data-report-type="group"
                    >
                        <div className="flex flex-col gap-[2.4rem]">
                            <div
                                className="flex items-center gap-[1rem]"
                                data-report-id="example-sidebar-brand"
                            >
                                <span className="inline-flex h-[3.2rem] w-[3.2rem] items-center justify-center bg-[#3b82f6] font-[family-name:var(--font-manrope)] text-[1.2rem]">
                                    QA
                                </span>
                                <div>
                                    <p className="text-[1.3rem] font-semibold">{shell.brand}</p>
                                    <p
                                        className="text-[1.1rem] text-white/55"
                                        data-report-id="example-sidebar-workspace"
                                    >
                                        {shell.workspace}
                                    </p>
                                </div>
                            </div>

                            <nav
                                className="flex flex-col gap-[0.4rem]"
                                aria-label={shell.navAriaLabel}
                                data-report-id="example-sidebar-nav"
                                data-report-type="group"
                            >
                                {DASHBOARD_NAV_ITEMS.map((item) => {
                                    const active = isDashboardNavActive(pathname, item.href);
                                    const label = nav.find((entry) => entry.id === item.id)?.label ?? item.id;

                                    return (
                                        <Link
                                            className={cn(
                                                "flex items-center gap-[1rem] px-[1.2rem] py-[1rem] text-[1.4rem] transition-colors",
                                                active ? "bg-white/12 text-white" : "text-white/65 hover:bg-white/8 hover:text-white",
                                            )}
                                            data-report-id={`example-sidebar-nav-${item.id}`}
                                            href={item.href}
                                            key={item.id}
                                        >
                                            <MaterialIcon
                                                name={item.icon}
                                                size={18}
                                            />
                                            {label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <button
                                className="flex items-center justify-center gap-[0.8rem] border border-white/25 bg-white/8 px-[1.2rem] py-[1rem] text-[1.3rem] text-white hover:border-white/40"
                                data-report-id="example-sidebar-open-modal"
                                onClick={openCreateIssue}
                                type="button"
                            >
                                {shell.createIssue}
                            </button>
                        </div>

                        <p
                            className="mt-[2.4rem] border-t border-white/10 pt-[2rem] text-[1.2rem] leading-[1.5] text-white/50"
                            data-report-id="example-sidebar-footer"
                        >
                            {shell.sidebarNote}
                        </p>
                    </aside>

                    <div
                        className="flex min-h-0 min-w-0 flex-1 flex-col"
                        data-report-id="example-dashboard-main"
                        data-report-type="group"
                    >
                        <header
                            className="flex shrink-0 flex-wrap items-center justify-between gap-[1.2rem] border-b border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] px-[2rem] py-[1.6rem]"
                            data-report-id="example-dashboard-topbar"
                            data-report-type="group"
                        >
                            <div
                                className="flex min-w-[20rem] flex-1 items-center gap-[1rem] border border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)] px-[1.2rem] py-[0.8rem]"
                                data-report-id="example-topbar-search"
                            >
                                <Search
                                    className="text-[var(--adaptive-text-muted)]"
                                    size={16}
                                />
                                <input
                                    className="w-full bg-transparent text-[1.4rem] outline-none placeholder:text-[var(--adaptive-text-muted)]"
                                    data-report-id="example-topbar-search-input"
                                    placeholder={shell.searchPlaceholder}
                                    type="search"
                                />
                            </div>

                            <div className="flex items-center gap-[0.8rem]">
                                <button
                                    className="relative border border-[var(--adaptive-border)] p-[0.9rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                                    data-report-id="example-topbar-notifications"
                                    onClick={openCreateIssue}
                                    type="button"
                                >
                                    <Bell size={16} />
                                    <span
                                        className="absolute right-[0.5rem] top-[0.5rem] h-[0.6rem] w-[0.6rem] bg-[#F9572E]"
                                        data-report-id="example-topbar-notification-dot"
                                    />
                                </button>
                                <button
                                    className="border border-[var(--adaptive-border)] px-[1.2rem] py-[0.9rem] text-[1.3rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                                    data-report-id="example-topbar-filter"
                                    type="button"
                                >
                                    {shell.filter}
                                </button>
                                <button
                                    className="flex items-center gap-[0.8rem] border border-[var(--adaptive-border)] px-[1rem] py-[0.6rem] hover:bg-[var(--adaptive-greyOpacity100)]"
                                    data-report-id="example-topbar-profile"
                                    type="button"
                                >
                                    <span
                                        className="flex h-[2.4rem] w-[2.4rem] items-center justify-center bg-[#1e293b] text-[1.1rem] text-white"
                                        data-report-id="example-topbar-avatar"
                                    >
                                        SJ
                                    </span>
                                    <span
                                        className="text-[1.3rem]"
                                        data-report-id="example-topbar-username"
                                    >
                                        {shell.profile}
                                    </span>
                                </button>
                            </div>
                        </header>

                        <div
                            className="flex min-h-0 flex-1 flex-col gap-[2.4rem] overflow-y-auto p-[2rem]"
                            data-report-id="example-dashboard-scroll"
                            data-report-type="group"
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {createIssueOpen ? <CreateIssueModal onClose={closeCreateIssue} /> : null}
            <ModalLabModals />
        </>
    );
}
