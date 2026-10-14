export type ContentSection = {
    heading?: string;
    paragraphs?: string[];
    items?: string[];
};

export type NewsletterPost = {
    slug: string;
    issue: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readingTime: string;
    sections: ContentSection[];
};

export type RoadmapColumn = {
    id: string;
    label: string;
    description: string;
    items: {
        title: string;
        description: string;
        area: string;
        status: string;
    }[];
};

export type ChangelogType = "new-feature" | "improvement" | "bug-fix" | "documentation";

export type ChangelogEntry = {
    slug: string;
    title: string;
    summary: string;
    date: string;
    changeType: ChangelogType;
    products: string[];
    stage: string;
    selfHosted: boolean;
    sections: ContentSection[];
};
