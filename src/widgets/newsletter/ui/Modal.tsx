"use client";

import { TestModal } from "../modal/TestModal";
import { useConfirmModalStore } from "../model/useConfirmModalStore";
import { useNewsletterSearch } from "../model/useNewsletterSearch";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useConfirmModalStore();
    const search = useNewsletterSearch();

    return (
        <>
            <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} search={search} />}
        </>
    );
}
