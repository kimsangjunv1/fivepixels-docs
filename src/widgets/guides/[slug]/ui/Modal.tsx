"use client";

import { TestModal } from "../modal/TestModal";
import { useGuidesDetailProvider } from "../model/GuidesDetailContext";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useGuidesDetailProvider();
    return <>
        <button className="sr-only" type="button" onClick={() => openConfirmModal("test")}>Open test modal</button>
        {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} />}
    </>;
}
