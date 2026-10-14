"use client";

import { TestModal } from "@/widgets/home/modal/TestModal";
import { useHomeProvider } from "@/widgets/home/model/HomeContext";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useHomeProvider();

    return (
        <>
            <button
                className="sr-only"
                type="button"
                onClick={() => openConfirmModal("test")}
            >
                Open test modal
            </button>
            {confirmModalTarget === "test" && <TestModal onClose={closeConfirmModal} />}
        </>
    );
}
