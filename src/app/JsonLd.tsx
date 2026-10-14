import { createSoftwareApplicationJsonLd, createWebsiteJsonLd } from "@/shared/lib/json-ld";

export function JsonLd() {
    const payload = [createWebsiteJsonLd(), createSoftwareApplicationJsonLd()];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
    );
}
