import type { GuideCollectionMessages } from "./guide/types";
import type { LandingContentMessages } from "./landing/types";

export type LandingMessages = LandingContentMessages & {
    guides: GuideCollectionMessages;
    docs: GuideCollectionMessages;
};
