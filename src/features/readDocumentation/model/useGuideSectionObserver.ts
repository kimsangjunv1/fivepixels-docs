"use client";

import { useEffect } from "react";

export function useGuideSectionObserver(sectionIds: string[], setActiveSectionId: (id: string) => void) {

    useEffect(() => {
        const elements = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]?.target.id) {
                    setActiveSectionId(visible[0].target.id);
                }
            },
            { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
        );

        for (const el of elements) observer.observe(el);
        return () => observer.disconnect();
    }, [sectionIds, setActiveSectionId]);
}
