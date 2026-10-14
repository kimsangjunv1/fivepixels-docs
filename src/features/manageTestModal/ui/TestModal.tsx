"use client";

import { useEffect, useId, useRef } from "react";
import type { useSearch } from "@/shared/lib/hooks/useSearch";

type TestModalProps = {
    onClose: () => void;
    search: ReturnType<typeof useSearch>;
};

export function TestModal({ onClose, search }: TestModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog?.showModal();
        return () => dialog?.close();
    }, []);

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            className="fixed inset-0 m-auto w-full max-w-sm border border-[var(--adaptive-border)] bg-[var(--adaptive-surface)] p-6 text-[var(--adaptive-text-primary)] backdrop:bg-black/60"
            onCancel={(event) => { event.preventDefault(); onClose(); }}
        >
            <h2 id={titleId} className="text-2xl font-semibold">Test modal</h2>
            <form className="mt-4 flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); search.search(); }}>
                <label>
                    Search term
                    <input className="ml-2 border px-2" value={search.keyword} onChange={(event) => search.setKeyword(event.target.value)} />
                </label>
                <label>
                    Page
                    <input className="ml-2 w-16 border px-2" type="number" min={1} value={search.page} onChange={(event) => search.setPage(Math.max(1, Number(event.target.value) || 1))} />
                </label>
                <div className="flex gap-3">
                    <button type="submit">Search</button>
                    <button type="button" onClick={search.reset}>Reset</button>
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </form>
        </dialog>
    );
}
