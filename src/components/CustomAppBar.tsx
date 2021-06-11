import React, {Dispatch, FC, SetStateAction} from "react";
import {useStyles} from "../styles/UseStyles";
import {AppBar, Button, Drawer, IconButton, Menu, Toolbar, Typography} from "@material-ui/core";
import {Debugger} from "inspector";
import {NavigationPage} from "../common/components/SideDrawer";
import {useTranslation} from "../common/i18n/UseTranslation";
import {en} from "../common/i18n/En";
import {it} from "../common/i18n/It";
import {MenuBook} from "@material-ui/icons";


export const CustomAppBar: FC<{
    menuClicked?: () => void
}> = ({menuClicked}) => {
    const classes = useStyles();
    const {t, setT} = useTranslation();
    return (
        <AppBar position="fixed" style={{
            color: "#333",
            background: "#eeeeeedd"
        }}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={() => menuClicked ? menuClicked() : null }
                >
                    <MenuBook></MenuBook>
                </IconButton>
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