"use client";

import { TestModal } from "../modal/TestModal";
import { useChangelogProvider } from "../model/ChangelogContext";

export function Modal() {
    const state = useChangelogProvider();
    const search = state;
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = state;

    return (
        <>
            <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} search={search} />}
        </>
    );
}
