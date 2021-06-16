import {en} from "./En";
import {plural} from "./i18n";

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
            seconds: (n: number) => plural(`un secondo fa|${n} secondi fa`, n),
            minutes: (n: number) => plural(`un minuto fa|${n} minuti fa`, n),
            hours: (n: number) => plural(`un ora fa|${n} ore fa`, n),
            days: (n: number) => plural(`un giorno fa|${n} giorni fa`, n),
            months: (n: number) => plural(`un mese fa|${n} mesi fa`, n),
            years: (n: number) => plural(`un anno fa|${n} anni fa`, n),
        },
        navigation: {
            topics: "Discussioni",
            login: "Login",
            documents: "Documenti",
            dashboard: "Console",
            resolutions: "Risoluzioni",
            communities: "Communita'",
            resolution: "Risoluzione",
            issues: "Problemi",
        },
        logout: "Uscita",

        dashboard: {
            title: (name: string) => `Ciao ${name}`
        },
        footer: {
            text: "©Copyright 2021 The Estate Manager Inc | Termine e Condizioni | Pratiche della Privacy | Carriere | Chi Siamo | Contatti"
        },
    },
    owner: {
        forums: {
            create: "Crea"
        },
    },
    admin: {},
    manager: {}
}