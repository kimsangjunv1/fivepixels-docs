/** Public site URL used for canonical links, Open Graph, and sitemap. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://library.codi-agit.com";

export const SITE_NAME = "fivepixels";

export const SITE_BANNER_MESSAGE = "This library is currently in development.";

export const SITE_DESCRIPTION =
    "A DOM-aware feedback layer for QA, staging, and internal tools. Leave feedback on real DOM elements, restore markers after UI changes, and review issues without screenshots.";

/** Public search indexing is enabled by default; set to "false" to block crawlers. */
export const ALLOW_SEARCH_INDEXING = process.env.NEXT_PUBLIC_ALLOW_SEARCH_INDEXING !== "false";

/** Indexable marketing/docs routes only — demo apps stay out of the sitemap. */
export const PUBLIC_ROUTES = [
    "/",
    "/guides/quickstart",
    "/guides/rollout",
    "/guides/rules",
    "/guides/client",
    "/guides/workflow",
    "/guides/roles",
    "/guides/faq",
    "/guides/dom-tagging",
    "/docs/setup",
    "/docs/dom-attributes",
    "/docs/modes",
    "/docs/ui-edit",
    "/docs/persistence",
    "/docs/auth-and-team",
    "/docs/github",
    "/docs/panel-and-tabs",
    "/docs/mentions-and-thread",
    "/docs/import-export",
    "/docs/custom-ui",
    "/docs/api",
    "/docs/edge-cases",
    "/newsletter",
    "/roadmap",
    "/changelog",
] as const;

export const GITHUB_URL = "https://github.com/kimsangjunv1/fivepixels";
