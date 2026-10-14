import { createPageMetadata } from "@/shared/lib/seo";
import { SITE_DESCRIPTION } from "@/shared/lib/site";
import { Main } from "@/widgets/layout/Main";
import { HomeView } from "@/views/home/HomeView";

export const metadata = createPageMetadata({
    absoluteTitle: true,
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: [
        "fivepixels",
        "@fivepixels-js/react",
        "QA tool",
        "DOM feedback",
        "DOM markers",
        "React library",
        "staging review",
        "open source",
    ],
});

const mainClassName = {
    container: "min-h-screen bg-[var(--adaptive-background)] text-[var(--adaptive-text-primary)]",
    inner: "mx-0 max-w-none px-0",
};

export default function Page() {
    return (
        <Main
            id="fivepixels"
            className={mainClassName}
        >
            <HomeView />
        </Main>
    );
}
