"use client";

import { TestModal } from "../modal/TestModal";
import { useConfirmModalStore } from "../model/useConfirmModalStore";
import { useChangelogDetailSearch } from "../model/useChangelogDetailSearch";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useConfirmModalStore();
    const search = useChangelogDetailSearch();

    return (
        <>
            <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} search={search} />}
        </>
    );
}
