"use client";

import { ApiError, request } from "./request";

let pendingMutations = 0;

function notifyLoading() {
    window.dispatchEvent(new CustomEvent("api:loading", { detail: { pending: pendingMutations } }));
}

export async function clientFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const method = (init?.method ?? (input instanceof Request ? input.method : "GET")).toUpperCase();
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    if (isMutation) {
        pendingMutations += 1;
        notifyLoading();
    }

    try {
        return await request<T>(input, init);
    } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 419)) {
            window.dispatchEvent(new CustomEvent("api:auth-expired", { detail: { status: error.status } }));
        }
        window.dispatchEvent(new CustomEvent("api:error", { detail: { error } }));
        throw error;
    } finally {
        if (isMutation) {
            pendingMutations -= 1;
            notifyLoading();
        }
    }
}
