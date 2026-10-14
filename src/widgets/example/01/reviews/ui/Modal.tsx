"use client";

import { TestModal } from "../modal/TestModal";
import { useConfirmModalStore } from "../model/useConfirmModalStore";
import { useExample01ReviewsSearch } from "../model/useExample01ReviewsSearch";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useConfirmModalStore();
    const search = useExample01ReviewsSearch();

    return (
        <>
            <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} search={search} />}
        </>
    );
}
