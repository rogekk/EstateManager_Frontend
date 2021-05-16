import React, {Dispatch, FC, SetStateAction} from "react";
import {en, pl, Translation} from "../Translations";
import {useStyles} from "../styles/UseStyles";
import {useLocation} from "react-router-dom";
import {AppBar, Button, IconButton, Menu, Toolbar, Typography} from "@material-ui/core";
import {Debugger} from "inspector";

function locationToTitle(location: string): string {
    if (location.includes("dashboard")) {
        return "Dashboard";
    } else if (location.includes("documents")) {
        return "Documents"
    } else if (location.includes("resolutions")) {
        return "Resolutions"
    } else if (location.includes("forums")) {
        return "Forums"
    }
    return "";
}

export const CustomAppBar: FC<{
    t: Translation,
    setTranslation: Dispatch<SetStateAction<Translation>>
}> = ({t, setTranslation}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <AppBar position="fixed" style={{marginLeft: '200px', width: 'calc(100% - 232px)',
            color: "#333",
            background: "#eeeeeedd"}}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {locationToTitle(location.pathname)}
                </Typography>
                <Button color="inherit" onClick={() => {
                    if (t === en) {
                        setTranslation(pl);
                    } else {
                        setTranslation(en);
                    }
                }
                }>Toggle language</Button>
            </Toolbar>
        </AppBar>
    );
};