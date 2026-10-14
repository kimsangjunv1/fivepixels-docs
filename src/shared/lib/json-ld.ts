import { GITHUB_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/shared/lib/site";

export function createWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
    };
}

export function createSoftwareApplicationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description: SITE_DESCRIPTION,
        url: new URL("/", SITE_URL).toString(),
        downloadUrl: GITHUB_URL,
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}
