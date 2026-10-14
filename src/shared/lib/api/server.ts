import "server-only";
import { request } from "./request";

// Backend-specific authentication belongs here when an authenticated API is introduced.
export function serverFetch<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    return request<T>(input, init);
}
