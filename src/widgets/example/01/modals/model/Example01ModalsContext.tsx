"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useInlineModal } from "./useInlineModal";
import { useConfirmModalStore } from "./useConfirmModalStore";
import { useExample01ModalsSearch } from "./useExample01ModalsSearch";

type Example01ModalsContextValue = ReturnType<typeof useInlineModal> & ReturnType<typeof useConfirmModalStore> & ReturnType<typeof useExample01ModalsSearch>;
const Example01ModalsContext = createContext<Example01ModalsContextValue | null>(null);

export function Example01ModalsPageProvider({ children }: { children: ReactNode }) {
    const pageState = useInlineModal();
    const modal = useConfirmModalStore();
    const search = useExample01ModalsSearch();
    return <Example01ModalsContext.Provider value={{ ...pageState, ...modal, ...search }}>{children}</Example01ModalsContext.Provider>;
}

export function useExample01ModalsProvider() {
    const value = useContext(Example01ModalsContext);
    if (!value) throw new Error("useExample01ModalsProvider must be used within Example01ModalsPageProvider");
    return value;
}
