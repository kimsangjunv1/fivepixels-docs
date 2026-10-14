"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useConfirmModalStore } from "./useConfirmModalStore";
import { useSearch } from "./useSearch";

type HomeContextValue = ReturnType<typeof useConfirmModalStore> & ReturnType<typeof useSearch>;

const HomeContext = createContext<HomeContextValue | null>(null);

export function HomePageProvider({ children }: Readonly<{ children: ReactNode }>) {
    const confirmModalStore = useConfirmModalStore();
    const searchStore = useSearch();

    return <HomeContext.Provider value={{ ...confirmModalStore, ...searchStore }}>{children}</HomeContext.Provider>;
}

export function useHomeProvider() {
    const context = useContext(HomeContext);

    if (!context) {
        throw new Error("useHomeProvider must be used within HomePageProvider");
    }

    return context;
}
