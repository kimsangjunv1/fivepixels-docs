export type MegaMenuLinkMessages = {
    label: string;
    description: string;
    href: string;
    icon: string;
};

export type MegaMenuGroupMessages = {
    eyebrow: string;
    title: string;
    links: MegaMenuLinkMessages[];
    viewAll?: MegaMenuLinkMessages;
};

export type MegaMenuConfigMessages = {
    id: string;
    label: string;
    href: string;
    groups: MegaMenuGroupMessages[];
};

export type LayoutMessages = {
    banner: string;
    header: {
        installGuide: string;
        homeAriaLabel: string;
        navAriaLabel: string;
    };
    footer: {
        home: {
            brand: string;
            description: string;
            product: string;
            explore: string;
            builtBy: string;
            links: {
                forDevelopers: string;
                compare: string;
                resources: string;
                overview: string;
                guide: string;
                docs: string;
                demo: string;
            };
            builtByCopy: string;
            copyright: string;
            tagline: string;
        };
        site: {
            codi: string;
            handle: string;
            developedBy: string;
            author: string;
            currentLibrary: string;
            libraries: string;
            githubAria: string;
            linkedInAria: string;
            logoAlt: string;
        };
    };
    megaMenus: MegaMenuConfigMessages[];
};

export type FivepixelsMessages = {
    panelTitles: string[];
    intro: {
        headline: [string];
        announcement: string;
        bodyLine1: string;
        bodyHighlight: string;
        bodyLine2: string;
        demoCta: string;
        guideCta: string;
    };
    pain: {
        eyebrow: string;
        titleLine1: string;
        titleLine2: string;
        bodyLine1: string;
        bodyLine2: string;
        cards: { eyebrow: string; title: string; description: string }[];
    };
    howItWorks: {
        steps: { number: string; title: string; description: string }[];
    };
    uiEdit: {
        items: {
            scene: string;
            label: string;
            title: string;
            titleLine2?: string;
            description: string;
            eyebrow: string;
        }[];
    };
    features: { icon: string; title: string; description: string }[];
    developerRelief: {
        tabAriaLabel: string;
        guideLink: string;
        steps: {
            id: string;
            tabLabel: string;
            eyebrow: string;
            title: string;
            description: string;
            note?: string;
            code: string;
            highlights: { title: string; detail: string }[];
            showGuideLink?: boolean;
        }[];
    };
    compare: {
        beforeHeader: string;
        afterHeader: string;
        rows: [string, string][];
    };
    audience: {
        cards: { title: string; description: string }[];
    };
    adoption: {
        whyEyebrow: string;
        reasons: { label: string; detail: string }[];
        rolloutEyebrow: string;
        rolloutSteps: { day: string; title: string; description: string }[];
        clientNoteEyebrow: string;
        clientNote: string;
    };
    faq: { question: string; answer: string }[];
    openSource: {
        title: string;
        bodyLine1: string;
        bodyLine2: string;
        cta: string;
        broughtBy: string;
        handle: string;
        profileAlt: string;
    };
};

export type ExampleMessages = {
    nav: { id: string; icon: string; label: string; href: string }[];
    shell: {
        backLink: string;
        brand: string;
        workspace: string;
        createIssue: string;
        sidebarNote: string;
        searchPlaceholder: string;
        filter: string;
        profile: string;
        navAriaLabel: string;
    };
    overview: {
        stats: { label: string; delta: string }[];
        kanban: { column: string; cards: { title: string; tag: string }[] }[];
        activityTitle: string;
        activities: string[];
    };
    issues: {
        eyebrow: string;
        title: string;
        description: string;
        openDetail: string;
        openModal: string;
    };
    reviews: {
        eyebrow: string;
        title: string;
        description: string;
        items: { title: string; author: string; status: string }[];
        requestChanges: string;
        approve: string;
        openModal: string;
    };
    releases: {
        eyebrow: string;
        title: string;
        description: string;
        items: { version: string; summary: string }[];
        viewChangelog: string;
    };
    settings: {
        eyebrow: string;
        title: string;
        description: string;
        toggles: { label: string; description: string }[];
        webhookLabel: string;
        webhookPlaceholder: string;
        save: string;
    };
    modalsLab: {
        eyebrow: string;
        title: string;
        description: string;
        cases: { title: string; description: string; technique: string }[];
        openModal: string;
        hostTitle: string;
        hostDescription: string;
        close: string;
        fillerTitle: string;
        fillerDescription: string;
    };
    listDemo: {
        eyebrow: string;
        title: string;
        filter: string;
        headers: string[];
        rows: { issue: string; status: string; tag: string; author: string; action: string }[];
    };
    createIssue: {
        eyebrow: string;
        title: string;
        close: string;
        formTitle: string;
        formDescription: string;
        titlePlaceholder: string;
        descriptionPlaceholder: string;
        tags: string[];
        submit: string;
        cancel: string;
    };
    fivePixels: {
        messageLabel: string;
        bugLabel: string;
        importantLabel: string;
    };
};

export type LandingContentMessages = {
    layout: LayoutMessages;
    fivepixels: FivepixelsMessages;
    example: ExampleMessages;
};
