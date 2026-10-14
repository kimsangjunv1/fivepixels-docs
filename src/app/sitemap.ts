import type { MetadataRoute } from "next";
import { changelogEntries, newsletterPosts } from "@/entities/content";
import { PUBLIC_ROUTES, SITE_URL } from "@/shared/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const contentRoutes = [
    ...newsletterPosts.map((post) => `/newsletter/${post.slug}`),
    ...changelogEntries.map((entry) => `/changelog/${entry.slug}`),
  ];

  return [...PUBLIC_ROUTES, ...contentRoutes].map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
