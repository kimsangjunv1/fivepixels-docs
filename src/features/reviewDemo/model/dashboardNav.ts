export const DASHBOARD_NAV_ITEMS = [
    { id: "overview", icon: "dashboard", href: "/example/01" },
    { id: "issues", icon: "bug_report", href: "/example/01/issues" },
    { id: "reviews", icon: "rate_review", href: "/example/01/reviews" },
    { id: "releases", icon: "rocket_launch", href: "/example/01/releases" },
    { id: "modals", icon: "layers", href: "/example/01/modals" },
    { id: "settings", icon: "settings", href: "/example/01/settings" },
] as const;

export type DashboardNavId = (typeof DASHBOARD_NAV_ITEMS)[number]["id"];

export function isDashboardNavActive(pathname: string, href: string) {
    if (href === "/example/01") {
        return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}
