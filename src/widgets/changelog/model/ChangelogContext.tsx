"use client";

import { createContext, useContext, type ReactNode } from "react";
import { changelogEntries } from "@/entities/content";
import { useChangelogFeed } from "./useChangelogFeed";
import { useConfirmModalStore } from "./useConfirmModalStore";
import { useChangelogSearch } from "./useChangelogSearch";

type ChangelogContextValue = ReturnType<typeof useChangelogFeed> & ReturnType<typeof useConfirmModalStore> & ReturnType<typeof useChangelogSearch>;
const ChangelogContext = createContext<ChangelogContextValue | null>(null);

export function ChangelogPageProvider({ children }: { children: ReactNode }) {
    const pageState = useChangelogFeed(changelogEntries);
    const modal = useConfirmModalStore();
    const search = useChangelogSearch();
    return <ChangelogContext.Provider value={{ ...pageState, ...modal, ...search }}>{children}</ChangelogContext.Provider>;
}

export function useChangelogProvider() {
    const value = useContext(ChangelogContext);
    if (!value) throw new Error("useChangelogProvider must be used within ChangelogPageProvider");
    return value;
}
