import {Dispatch, SetStateAction, useState} from "react";
import {en, Translation} from "./Translations";

export function plural(string: string, number: number): string {
    const [singular, plural, zero] = string.split("|")
    console.log(number)

    if (number === 0 && zero){
        return zero
    } else if (number === 1) {
        return singular
    } else {
        return plural
    }
}

export const useLocale: (def: Translation) => [Translation, Dispatch<SetStateAction<Translation>>] = (def) => {
    const [current, setCurrent] = useState(en)
    return [current, setCurrent]
}
