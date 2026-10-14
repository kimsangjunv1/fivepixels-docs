import changelogData from "@/entities/content/data/changelog.json";
import newsletterData from "@/entities/content/data/newsletter.json";
import roadmapData from "@/entities/content/data/roadmap.json";

import type { NewsletterPost, RoadmapColumn, ChangelogEntry, ChangelogType } from "../model/content.type";

export const newsletterPosts = newsletterData as NewsletterPost[];
export const roadmapColumns = roadmapData as RoadmapColumn[];
export const changelogEntries = changelogData as ChangelogEntry[];

export const changelogTypeLabels: Record<ChangelogType, string> = {
    "new-feature": "New feature",
    improvement: "Improvement",
    "bug-fix": "Bug fix",
    documentation: "Documentation",
};
