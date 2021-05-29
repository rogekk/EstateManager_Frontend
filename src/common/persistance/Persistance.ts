import Cookies from "universal-cookie";

const cookies = new Cookies()
const user = "user"
const token = "token"

// TODO proper domain
const domain = "localhost"

export function persistUser(id: string) {
    cookies.set(user, id);
}

export function getPersistedUser(): string {
    return cookies.get(user);
}

export function removePersistedUser() {
    cookies.remove(user, {path: "/", domain: domain});
}

export function persistToken(t: string) {
    cookies.set(token, t);
}

export function getPersistedToken(): string {
    return cookies.get(token);
}

export function removePersistedToken() {
    cookies.remove(token, {path: "/", domain: domain});
}

