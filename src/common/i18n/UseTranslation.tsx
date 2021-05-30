import React, {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {en, Translation} from "./Translations";

export const TranslationContext = React.createContext<
    [Translation, Dispatch<SetStateAction<Translation>>]>(["", ""] as unknown as [Translation, Dispatch<SetStateAction<Translation>>]);

export const TranslationProvider: FC<{}> = (props) => {
    const [a, setA] = useState("");
    const [t, setT] = useState(en)

    return <TranslationContext.Provider value = {[t, setT]}>
        {props.children}
    </TranslationContext.Provider>
}

export const useTranslation = ()  => {
    const [t, setT] = useContext(TranslationContext);
    return {t, setT};
}