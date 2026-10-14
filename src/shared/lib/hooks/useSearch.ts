"use client";

import { useState } from "react";

export function useSearch() {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);

    const reset = () => {
        setKeyword("");
        setPage(1);
    };

    const search = () => ({ keyword, page });

    return {
        keyword,
        page,
        setKeyword,
        setPage,
        reset,
        search,
    };
}
