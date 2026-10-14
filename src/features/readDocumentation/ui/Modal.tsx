"use client";

import { TestModal } from "@/features/readDocumentation/modal/TestModal";
import { useGuideProvider } from "@/features/readDocumentation/model/GuideContext";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useGuideProvider();

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
