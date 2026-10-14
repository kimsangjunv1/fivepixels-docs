"use client";

import { TestModal } from "@/widgets/example/01/modal/TestModal";
import { useExample01Provider } from "@/widgets/example/01/model/Example01Context";

export function Modal() {
    const { confirmModalTarget, openConfirmModal, closeConfirmModal } = useExample01Provider();

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
