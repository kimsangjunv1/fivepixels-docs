"use client";

import { TestModal } from "../modal/TestModal";
import { useDocsDetailProvider } from "../model/DocsDetailContext";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useDocsDetailProvider();
    return <>
        <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
        {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} />}
    </>;
}
