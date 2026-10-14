export class ApiError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

export async function request<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);
    const text = response.status === 204 || response.status === 205 ? "" : await response.text();
    let body: unknown = text || undefined;

    if (text && response.headers.get("content-type")?.includes("json")) {
        try {
            body = JSON.parse(text);
        } catch {
            throw new ApiError(response.status, response.ok ? "Invalid JSON response" : response.statusText || "Request failed");
        }
    }

    if (!response.ok) {
        const message = typeof body === "object" && body !== null && "message" in body && typeof body.message === "string"
            ? body.message
            : response.statusText || "Request failed";
        throw new ApiError(response.status, message);
    }

    return body as T;
}
