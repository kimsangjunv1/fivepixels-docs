import type { MetadataRoute } from "next";
import { ALLOW_SEARCH_INDEXING, SITE_URL } from "@/shared/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_SEARCH_INDEXING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
