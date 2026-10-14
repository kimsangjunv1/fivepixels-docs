import { AlertTriangle, Info } from "lucide-react";
import { RichText } from "@/shared/ui/rich-text";
import { cn } from "@/shared/lib/utils";

export function Callout({ text, variant = "info" }: { text: string; variant?: "info" | "warning" }) {
    const Icon = variant === "warning" ? AlertTriangle : Info;

    return (
        <div
            className={cn(
                "flex gap-[1.2rem] rounded-[0.8rem] border px-[1.8rem] py-[1.6rem] text-[1.5rem] leading-[1.5] text-[var(--adaptive-text-secondary)]",
                variant === "warning" ? "border-[var(--adaptive-accent-coral)]/30 bg-[var(--adaptive-grey50)]" : "border-[var(--adaptive-border)] bg-[var(--adaptive-grey50)]",
            )}
        >
            <Icon
                className="mt-[0.2rem] size-[1.6rem] shrink-0 text-[var(--adaptive-accent-coral)]"
                aria-hidden
            />
            <p>
                <RichText text={text} />
            </p>
        </div>
    );
}
