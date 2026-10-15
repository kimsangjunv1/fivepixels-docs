"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMessages } from "@/shared/i18n/useMessages";
import { cn } from "@/shared/lib/utils";
import { MegaMenuBar, MegaMenuFloatingPanel, getMegaMenuSlideDirection } from "@/widgets/layout/MegaMenu";
import { ThemeToggle } from "@/widgets/layout/ThemeToggle";
import type { MegaMenuSlideDirection } from "@/widgets/layout/MegaMenu";
import type { MegaMenuConfig } from "@/widgets/layout/megaMenuNav";

const contentNavItems = [
    { label: "NEWSLETTER", href: "/newsletter" },
    { label: "ROADMAP", href: "/roadmap" },
    { label: "CHANGELOG", href: "/changelog" },
] as const;

function getActiveMegaMenuId(pathname: string) {
    if (pathname.startsWith("/docs")) return "docs";
    if (pathname.startsWith("/example")) return "examples";
    if (pathname === "/") return "main";
    return undefined;
}

function FivepixelsSiteHeader({ pathname, megaMenus }: { pathname: string; megaMenus: MegaMenuConfig[] }) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [slideDirection, setSlideDirection] = useState<MegaMenuSlideDirection>(1);
    const previousMenuIdRef = useRef<string | null>(null);
    const { header } = useMessages().layout;
    const activeMegaMenuId = getActiveMegaMenuId(pathname);
    const isDocumentation = pathname.startsWith("/guides") || pathname.startsWith("/docs") || pathname === "/guide";
    const openMenu = megaMenus.find((menu) => menu.id === openMenuId) ?? null;
    const closeMenu = useCallback(() => {
        previousMenuIdRef.current = null;
        setOpenMenuId(null);
    }, []);

    const handleOpenChange = useCallback((menuId: string | null) => {
        if (menuId) {
            setSlideDirection(getMegaMenuSlideDirection(previousMenuIdRef.current, menuId));
            previousMenuIdRef.current = menuId;
        } else {
            previousMenuIdRef.current = null;
        }

        setOpenMenuId(menuId);
    }, []);

    useEffect(() => {
        if (!openMenuId) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [closeMenu, openMenuId]);

    return (
        <div
            className="fixed top-0 z-[100] w-full"
            onMouseLeave={closeMenu}
        >
            <header className={cn("border-b border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] font-[family-name:var(--font-manrope)] text-[var(--adaptive-text-primary)] transition-colors", !isDocumentation && "pt-[3.2rem]")}>
                <div className="mx-auto flex w-full max-w-[var(--size-pc)] items-center justify-between border-x border-x-[var(--adaptive-border)] px-[1.6rem] tablet:px-[2.4rem]">
                    <section className="flex items-center gap-[2.4rem]">
                        <Link
                            className="flex shrink-0 gap-[2.4rem] leading-none"
                            href="/"
                            aria-label={header.homeAriaLabel}
                        >
                            <Image
                                className="theme-adaptive-logo"
                                src="/rebranding/agit-logo.svg"
                                alt="agit"
                                width={56}
                                height={24}
                                priority
                            />
                            <div className="h-[7.2rem] w-[0.1rem] bg-[var(--adaptive-border)]" />
                            <Image
                                className="theme-adaptive-logo"
                                src="/rebranding/logo.svg"
                                alt="fivepixels"
                                width={158}
                                height={24}
                                priority
                            />
                        </Link>

                        <div className="h-[7.2rem] w-[0.1rem] bg-[var(--adaptive-border)]" />
                        <nav
                            className={cn("ml-[1.6rem] flex min-w-0 items-center leading-none", isDocumentation && "max-[900px]:hidden")}
                            aria-label={header.navAriaLabel}
                        >
                            <MegaMenuBar
                                activeMenuId={activeMegaMenuId}
                                menus={megaMenus}
                                onOpenChange={handleOpenChange}
                                openMenuId={openMenuId}
                            />
                        </nav>
                    </section>

                    <section className={cn("flex items-center gap-[0.4rem]", isDocumentation && "max-[900px]:hidden")}>
                        <span className="mx-[1rem] h-[2.4rem] w-px shrink-0 bg-[var(--adaptive-border)]" />

                        <div className="flex shrink-0 items-center gap-[0.2rem]">
                            {contentNavItems.map((item) => {
                                const isActive = pathname.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "rounded-[0.8rem] px-[1.1rem] py-[1rem] text-[1.35rem] font-medium transition-colors hover:bg-[var(--adaptive-greyOpacity100)] hover:text-[var(--adaptive-text-primary)] pc:text-[1.45rem]",
                                            isActive ? "text-[var(--adaptive-text-primary)]" : "text-[var(--adaptive-text-muted)]",
                                        )}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <ThemeToggle />
                    </section>
                </div>
            </header>

            {openMenu ? (
                <div className={cn("pointer-events-none absolute inset-x-0 px-[1.2rem] pt-[1.2rem] tablet:px-[2.4rem]", isDocumentation ? "top-[7.2rem]" : "top-[9.2rem]")}>
                    <div className="pointer-events-auto mx-auto w-full max-w-[var(--size-pc)]">
                        <MegaMenuFloatingPanel
                            direction={slideDirection}
                            menu={openMenu}
                            onNavigate={closeMenu}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export function Header() {
    const pathname = usePathname();
    const megaMenus = useMessages().layout.megaMenus;

    if (pathname.startsWith("/example/01")) {
        return null;
    }

    return (
        <FivepixelsSiteHeader
            key={pathname}
            pathname={pathname}
            megaMenus={megaMenus}
        />
    );
}
