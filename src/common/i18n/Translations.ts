import {plural} from "./i18n";

export const en = {
    common: {
        toggleLanguage: "Toggle Langage",
        createTopic: "Create Topic",
        topicCreation: {
            subject: "Subject",
            description: "Description",
        },
        topics: {
            comments: "Comments: "
        },
        login: {
            loginButton: "Login",
            email: "Email",
            password: "Password",
            attempts: (n: number) => plural(`You have one attempt remaining|You have ${n} attempts remaining|You have no more attempts remaining, please contact admin`, n)
        },
        navigation: {
            topics: "Topics",
            login: "Login",
            documents: "Documents",
            dashboard: "Dashboard",
            resolutions: "Resolutions",
            resolution: "Resolution",
        },
        timeAgo: {
            seconds: (n: number) =>  plural(`a second ago|${n} seconds ago`, n),
            minutes: (n: number) =>  plural(`a minute ago|${n} minutes ago`, n),
            hours: (n: number) =>  plural(`a hour ago|${n} hours ago`, n),
            days: (n: number) =>  plural(`a day ago|${n} days ago`, n),
            months: (n: number) =>  plural(`a month ago|${n} months ago`, n),
            years: (n: number) =>  plural(`a year ago|${n} years ago`, n),
        },
        logout: "Logout",

    },
    owner: {
        forums: {
            create: "Create"
        },
    },
    admin: {},
    manager: {}
}

export const it: typeof en = {
    common: {
        toggleLanguage: "Cambia Lingua",
        createTopic: "Crea nuova discussione",
        topicCreation: {
            subject: "Titolo",
            description: "Descrizione",
        },
        topics: {
          comments: "Commenti: "
        },
        login: {
            loginButton: "Login",
            email: "Email",
            password: "Password",
            attempts: (n: number) => plural(`You have one attempt remaining|You have ${n} attempts remaining|You have no more attempts remaining, please contact admin`, n)
        },
        timeAgo: {
            seconds: (n: number) =>  plural(`un secondo fa|${n} secondi fa`, n),
            minutes: (n: number) =>  plural(`un minuto fa|${n} minuti fa`, n),
            hours: (n: number) =>  plural(`un ora fa|${n} ore fa`, n),
            days: (n: number) =>  plural(`un giorno fa|${n} giorni fa`, n),
            months: (n: number) =>  plural(`un mese fa|${n} mesi fa`, n),
            years: (n: number) =>  plural(`un anno fa|${n} anni fa`, n),
        },
        navigation: {
            topics: "Discussioni",
            login: "Login",
            documents: "Documenti",
            dashboard: "Console",
            resolutions: "Risoluzioni",
            resolution: "Risoluzione",
        },
        logout: "Uscita"
    },
    owner: {
        forums: {
            create: "Crea"
        },
    },
    admin: {},
    manager: {}
}

export type Translation = typeof en | typeof it
