"use client";

import { useState } from "react";

export type ConfirmModalTarget = "test";

export function useConfirmModalStore() {
    const [confirmModalTarget, setConfirmModalTarget] = useState<ConfirmModalTarget | null>(null);

    const openConfirmModal = (target: ConfirmModalTarget) => {
        setConfirmModalTarget(target);
    };

    const closeConfirmModal = () => {
        setConfirmModalTarget(null);
    };

    return {
        confirmModalTarget,
        openConfirmModal,
        closeConfirmModal,
    };
}
