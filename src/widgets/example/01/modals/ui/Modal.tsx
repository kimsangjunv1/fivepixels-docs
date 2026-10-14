"use client";

import { TestModal } from "../modal/TestModal";
import { useExample01ModalsProvider } from "../model/Example01ModalsContext";

export function Modal() {
    const state = useExample01ModalsProvider();
    const search = state;
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = state;

    return (
        <>
            <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} search={search} />}
        </>
    );
}
