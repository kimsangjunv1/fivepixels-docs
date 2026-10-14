"use client";

import { create } from "zustand";

export const MODAL_LAB_IDS = [
    "zustand",
    "opacity",
    "display-none",
    "visibility-hidden",
    "transform-offscreen",
    "scroll-vertical",
    "scroll-horizontal",
    "nested-scroll",
    "nested-stack",
    "inline-positioned",
    "issues-display-none",
    "issues-scroll-x",
    "reviews-opacity",
    "reviews-zustand",
    "nested-stack-2",
] as const;

export type ModalLabId = (typeof MODAL_LAB_IDS)[number];

type ModalLabState = {
    openIds: Partial<Record<ModalLabId, boolean>>;
    open: (id: ModalLabId) => void;
    close: (id: ModalLabId) => void;
    toggle: (id: ModalLabId) => void;
    isOpen: (id: ModalLabId) => boolean;
};

export const useModalLabStore = create<ModalLabState>((set, get) => ({
    openIds: {},
    open: (id) => set((state) => ({ openIds: { ...state.openIds, [id]: true } })),
    close: (id) => set((state) => ({ openIds: { ...state.openIds, [id]: false } })),
    toggle: (id) => {
        const next = !get().isOpen(id);
        set((state) => ({ openIds: { ...state.openIds, [id]: next } }));
    },
    isOpen: (id) => Boolean(get().openIds[id]),
}));
