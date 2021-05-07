export async function api<T>(
    path: string,
    opts?: { method?: string; body?: FormData | string }
): Promise<T> {
    const url = "http://localhost:9999/v1" + path;
    const response = await fetch(url, opts);

    if (!response.ok && response.status >= 400) {
        throw new Error("api request failed.");
    }
    return (await response.json()) as Promise<T>;
}