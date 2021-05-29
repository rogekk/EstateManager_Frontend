import React, {Dispatch, FC, SetStateAction} from "react";
import {en, it, Translation} from "../common/i18n/Translations";
import {useStyles} from "../styles/UseStyles";
import {AppBar, Button, IconButton, Menu, Toolbar, Typography} from "@material-ui/core";
import {Debugger} from "inspector";
import {NavigationPage} from "../common/components/SideDrawer";


export const CustomAppBar: FC<{
    t: Translation,
    page: NavigationPage,
    setTranslation: Dispatch<SetStateAction<Translation>>
}> = ({t, setTranslation, page}) => {
    const classes = useStyles();
    return (
        <AppBar position="fixed" style={{marginLeft: '200px', width: 'calc(100% - 232px)',
            color: "#333",
            background: "#eeeeeedd"}}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {page.name}
                </Typography>
                <Button color="inherit" onClick={() => {
                    if (t === en) {
                        setTranslation(it);
                    } else {
                        setTranslation(en);
                    }
                }
                }>{t.common.toggleLanguage}</Button>
            </Toolbar>
        </AppBar>
    );
};