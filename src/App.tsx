import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton, List, ListItem, ListItemIcon,
    ListItemText,
    Menu,
    Paper, SvgIcon,
    Toolbar,
    Typography
} from '@material-ui/core';
import {BrowserRouter, Route, useHistory, useLocation} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, pl, Translation} from "./Translations";
import {Forums} from "./components/Forums";
import {Community, OwnerProfile} from "./components/Types";
import {Forum, Dashboard as DashboardIcon, HowToVote, InsertDriveFile} from "@material-ui/icons";
import Cookies from "universal-cookie";
import {getProfile} from "./services/TopicsService";
import {History, LocationState} from 'history';

export const getToken = () => new Cookies().get("token");
export const getOwner = () => new Cookies().get("owner");

export type Page = 'dashboard' | 'forums' | 'resolutions';

export const NavigationItem: FC<{
    icon: typeof SvgIcon,
    t: Translation,
    page: [Page, string, string],
    setPage: React.Dispatch<SetStateAction<Page>>,
}> = ({icon, t, page, setPage}) => {
    const location = useLocation();
    const history = useHistory();
    const[p, path, name] = page

    return (<ListItem selected={location.pathname === path } button onClick={() => {
        setPage(p);
        history.push(path);
    }}>
        <ListItemIcon>
            {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText>
            {name}
        </ListItemText>
    </ListItem>)

}

export const CustomAppBar: FC<{
    t: Translation,
    setTranslation: Dispatch<SetStateAction<Translation>>
}> = ({t, setTranslation}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <AppBar position="fixed" style={{marginLeft: '200px', width: 'calc(100% - 200px)'}}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu open={false}/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {location.pathname}
                </Typography>
                <Button color="inherit" onClick={(e) => {
                    console.log("clicking");
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

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);
    const [community, setCommunity] = useState<Community>({id: {id: "id1"}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>()
    const [currentPage, setPage] = useState<Page>('forums')
    const history = useHistory();

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login");
            }

            if (owner == null && getOwner() != null) {
                getProfile(getOwner()).then(r => setOwner(r))
            }
        }
    )


    return (
        <Box className={classes.background}>

            <BrowserRouter>
                <CustomAppBar t={t} setTranslation={setTranslation}/>
                <SideDrawer t={t} page={currentPage} setPage={setPage}/>
                <Route exact path="/login" render={() => <Login t={t}/>}/>
                <Route exact path="/dashboard" render={() => <Dashboard t={t} profile={owner}/>}/>
                <Route exact path="/forums" render={() => <Forums t={t} community={community}/>}/>
            </BrowserRouter>
        </Box>
    );
}

export default App;


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
                    <NavigationItem icon={InsertDriveFile} t={t} page={[page, "/documents", "Documents"]} setPage={setPage}/>
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