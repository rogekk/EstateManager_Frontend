import {Translation} from "../i18n/Translations";

export const timeAgo = (t: Translation, prevDate: number) => {
    const diff = Number(new Date()) - prevDate;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
            return t.common.timeAgo.seconds(seconds);
        case diff < hour:
            return t.common.timeAgo.minutes(Math.round(diff / minute));
        case diff < day:
            return t.common.timeAgo.hours(Math.round(diff / hour));
        case diff < month:
            return t.common.timeAgo.days(Math.round(diff / day));
        case diff < year:
            return t.common.timeAgo.months(Math.round(diff / month));
        case diff > year:
            return t.common.timeAgo.years(Math.round(diff / year));
        default:
            return "";
    }
};

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const renderText = (txt: string) =>
    txt
        .split(" ")
        .map(part =>
            URL_REGEX.test(part) ? <a href={part}>{part} </a> : part + " "
        );
