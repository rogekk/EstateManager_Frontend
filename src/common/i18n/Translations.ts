import {plural} from "./i18n";

export const en = {
    common: {
        login: {
            loginButton: "Login",
            email: "Email",
            password: "Password",
            attempts: (n: number) => plural(`You have one attempt remaining|You have ${n} attempts remaining|You have no more attempts remaining, please contact admin`, n)
        },
    },
    owner: {
        forums: {
            create: "Create"
        },
        navigation: {
            topics: "Topics",
        }
    },
    admin: {
    },
    manager: {

    }
}

export type Translation = typeof en
