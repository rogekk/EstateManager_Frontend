import React, {FC, SetStateAction} from "react";
import {Translation} from "./Translations";
import {useHistory, useLocation} from "react-router-dom";
import {List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from "@material-ui/core";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Page} from "./components/Types";
import {NavigationItem} from "./components/NavigationItem";

export const SideDrawer: FC<{
    t: Translation,
    page: Page,
    setPage: React.Dispatch<SetStateAction<Page>>
}> = ({t, page, setPage}) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <Paper style={{flexShrink: 0, width: "200px", paddingTop: "96px"}}>
            <Typography>
                <List>
                    <NavigationItem icon={InsertDriveFile} t={t} page={[page, "/documents", "Documents"]}
                                    setPage={setPage}/>
                    <ListItem selected={location.pathname === '/forums'} button onClick={() => {
                        setPage('forums');
                        history.push("/forums");
                    }}>
                        <ListItemIcon>
                            <Forum/>
                        </ListItemIcon>
                        <ListItemText>
                            Forum
                        </ListItemText>
                    </ListItem>
                    <ListItem selected={location.pathname === '/dashboard'} button onClick={() => {
                        setPage('dashboard');
                        history.push("/dashboard");
                    }}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItem>
                    <ListItem selected={location.pathname === '/resolutions'} button onClick={() => {
                        setPage('resolutions');
                        history.push("/resolutions");
                    }}>
                        <ListItemIcon>
                            <HowToVote/>
                        </ListItemIcon>
                        <ListItemText>
                            Resolutions
                        </ListItemText>
                    </ListItem>
                </List>
            </Typography>
        </Paper>
    );
}