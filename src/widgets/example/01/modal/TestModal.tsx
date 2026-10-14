type TestModalProps = {
    onClose: () => void;
};

export function TestModal({ onClose }: TestModalProps) {
    return (
        <div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="example-01-test-modal-title"
        >
            <div className="w-full max-w-sm bg-[var(--adaptive-surface)] p-6 text-[var(--adaptive-text-primary)]">
                <h2
                    className="text-2xl font-semibold"
                    id="example-01-test-modal-title"
                >
                    Test modal
                </h2>
                <button
                    className="mt-6 border border-[var(--adaptive-text-primary)] px-4 py-2 font-[family-name:var(--font-inter)]"
                    type="button"
                    onClick={onClose}
                >
                    close
                </button>
            </div>
        </div>
    );
}
