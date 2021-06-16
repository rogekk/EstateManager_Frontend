import React, {FC} from "react";
import {useStyles} from "../../styles/UseStyles";
import {AppBar, Button, Drawer, IconButton, Menu, Toolbar, Typography} from "@material-ui/core";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {en} from "../../common/Translator/En";
import {it} from "../../common/Translator/It";
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