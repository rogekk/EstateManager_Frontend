import React, {FC} from "react";
import {useTranslation} from "../i18n/UseTranslation";
import {Typography} from "@material-ui/core";

export const Footer: FC<{}> = () => {
    const {t} = useTranslation();

    return (<Typography style={{
        color: '#fff',
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        top: '95%',
        marginLeft: '100px',
        zIndex: 0,
        textShadow: '1px 1px 4px #000'
    }} variant={'subtitle2'}>
        {t.common.footer.text}
    </Typography>)

}