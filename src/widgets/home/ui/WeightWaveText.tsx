type WeightWaveTextProps = {
    lines: string[];
    className?: string;
    as?: "div" | "h1" | "h2" | "p" | "span";
};

export function WeightWaveText({ lines, className, as: Tag = "div" }: WeightWaveTextProps) {
    return (
        <>
            <Tag
                className={`weight-wave-text ${className ?? ""}`}
                aria-label={lines.join(" ")}
            >
                {lines.map((line, lineIndex) => (
                    <span
                        key={`${line}-${lineIndex}`}
                        className="block"
                    >
                        {Array.from(line).map((char, charIndex) => (
                            <span
                                key={`${char}-${lineIndex}-${charIndex}`}
                                className={`${className} inline-block will-change-transform`}
                                style={{ ["--wave-delay" as string]: `${(lineIndex * 10 + charIndex) * 70}ms` }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </span>
                ))}
            </Tag>
            {/* animation: weight-wave 2400ms ease-in-out infinite; */}
            <style jsx>{`
                .weight-wave-text :global(span.inline-block) {
                    animation: weight-wave 5000ms ease-in-out infinite;
                    animation-delay: var(--wave-delay);
                }

                @keyframes weight-wave {
                    0% {
                        font-weight: 50;
                        color: var(--adaptive-text-primary);
                    }
                    50% {
                        font-weight: 700;
                        color: #f6572e;
                    }
                    100% {
                        font-weight: 50;
                        color: var(--adaptive-text-primary);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .weight-wave-text :global(span.inline-block) {
                        animation: none;
                        font-weight: 50;
                        transform: none;
                    }
                }
            `}</style>
        </>
    );
}
