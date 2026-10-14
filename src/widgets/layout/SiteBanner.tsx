"use client";

import { useMessages } from "@/shared/i18n/useMessages";
import { usePathname } from "next/navigation";

export function SiteBanner() {
    const pathname = usePathname();
    const banner = useMessages().layout.banner;

    if (pathname.startsWith("/example/01") || pathname.startsWith("/guides") || pathname.startsWith("/docs") || pathname === "/guide") {
        return null;
    }

    return (
        <div
            className="fixed top-0 left-0 z-[110] flex h-[var(--site-banner-height)] w-full items-center justify-center bg-black px-[1.2rem] font-[family-name:var(--font-manrope)] text-[1.4rem] font-medium text-white"
            role="status"
        >
            {banner}
        </div>
    );
}
