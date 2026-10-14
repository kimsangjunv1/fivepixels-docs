"use client";

import { useState } from "react";

export function useInlineModal() {
    const [inlineOpen, setInlineOpen] = useState(false);
    return { inlineOpen, setInlineOpen };
}
