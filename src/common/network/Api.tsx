import Cookies from "universal-cookie";

export async function api<T>(
    path: string,
    opts?: { method?: string; body?: FormData | string },
    search?: {}
): Promise<T> {
    const token = new Cookies().get("token")
    const url = "http://localhost:9999/v1" + path + new URLSearchParams(search);
    const response = await fetch(url, {
        ...opts,
        headers: {"X-Auth-Token": token}
    });

    if (!response.ok && response.status === 401) {
        window.location.replace("/login")
    }
    
    
    return (await response.json()) as Promise<T>;
}

export async function get<T>(path: string, search: {} = {}): Promise<T> {
    return api<T>(path, {method: "GET"}, search)
}

export async function post<T>(path: string, body: any): Promise<T> {
    return api<T>(path, {method: "POST", body: JSON.stringify(body)})
}
