export function formatContentDate(date: string, includeYear = true) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        ...(includeYear ? { year: "numeric" } : {}),
        timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));
}
