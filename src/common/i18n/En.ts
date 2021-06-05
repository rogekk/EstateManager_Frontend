import {plural} from "./i18n";

export const en = {
    common: {
        toggleLanguage: "Change Language",
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
            issues: "Issues",
            resolutions: "Resolutions",
            communites: "Communities",
            resolution: "Resolution",
        },
        timeAgo: {
            seconds: (n: number) => plural(`a second ago|${n} seconds ago`, n),
            minutes: (n: number) => plural(`a minute ago|${n} minutes ago`, n),
            hours: (n: number) => plural(`a hour ago|${n} hours ago`, n),
            days: (n: number) => plural(`a day ago|${n} days ago`, n),
            months: (n: number) => plural(`a month ago|${n} months ago`, n),
            years: (n: number) => plural(`a year ago|${n} years ago`, n),
        },
        logout: "Logout",
        dashboard: {
            title: (name: string) => `Hello ${name}`
        },
        footer: {
            text: "©Copyright 2021 The Estate Manager Inc | Terms and Conditions | Privacy Policy | Careers | About | Contact"
        },
    },
    owner: {
        forums: {
            create: "Create"
        },
    },
    admin: {},
    manager: {}
}