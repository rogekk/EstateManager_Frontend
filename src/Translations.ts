import {plural} from "./i18n";

export const en = {
    login: {
        loginButton: "Login",
        email: "Email",
        password: "Password",
        attempts: (n: number) => plural(`You have one attempt remaining|You have ${n} attempts remaining|You have no more attempts remaining, please contact admin`, n)
    },
}

export const pl: typeof en = {
    login: {
        loginButton: "Zaloguj",
        email: "Email",
        password: "Hasło",
        attempts: (n) => "jdljflkds"
    },
}

export type Translation = typeof en | typeof pl
