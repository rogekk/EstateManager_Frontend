import React, {Dispatch, FC, SetStateAction} from "react";
import {useStyles} from "../styles/UseStyles";
import {AppBar, Button, IconButton, Menu, Toolbar, Typography} from "@material-ui/core";
import {Debugger} from "inspector";
import {NavigationPage} from "../common/components/SideDrawer";
import {useTranslation} from "../common/i18n/UseTranslation";
import {en} from "../common/i18n/En";
import {it} from "../common/i18n/It";


export const CustomAppBar: FC<{
}> = ({}) => {
    const classes = useStyles();
    const {t, setT} = useTranslation();
    return (
        <AppBar position="fixed" style={{marginLeft: '200px', width: 'calc(100% - 232px)',
            color: "#333",
            background: "#eeeeeedd"}}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {"========="}
                </Typography>
                <Button color="inherit" onClick={() => {
                    if (t === en) {
                        setT(it);
                    } else {
                        setT(en);
                    }
                }
                }>{t.common.toggleLanguage}</Button>
            </Toolbar>
        </AppBar>
    );
};