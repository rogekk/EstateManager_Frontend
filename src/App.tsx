import React, {useEffect, useState} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton, List, ListItem, ListItemIcon,
    ListItemText,
    Menu,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, pl} from "./Translations";
import {Forums} from "./components/Forums";
import {Community, OwnerProfile} from "./components/Types";
import {Forum, Dashboard as DashboardIcon, HowToVote} from "@material-ui/icons";
import Cookies from "universal-cookie";
import {getProfile} from "./services/TopicsService";

export const getToken = () => new Cookies().get("token");
export const getOwner = () => new Cookies().get("owner");

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);
    const [community, setCommunity] = useState<Community>({id: {id: "id1"}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>()

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
            <AppBar position="fixed" style={{marginLeft: '200px', width: 'calc(100% - 200px)'}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Topics
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
            <Paper style={{flexShrink: 0, width: "200px", paddingTop: "96px"}}>
                <Typography>
                    <List>
                        <ListItem selected button>
                            <ListItemIcon>
                                <Forum/>
                            </ListItemIcon>
                            <ListItemText>
                                Forum
                            </ListItemText>
                        </ListItem>
                        <ListItem selected={false} button>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Dashboard
                            </ListItemText>
                        </ListItem>
                        <ListItem selected={false} button>
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

            <BrowserRouter>
                <Route exact path="/login" render={() => <Login t={t}/>}/>
                <Route exact path="/dashboard" render={() => <Dashboard t={t}/>}/>
                <Route exact path="/forums" render={() => <Forums t={t} community={community}/>}/>
            </BrowserRouter>
        </Box>
    );
}

export default App;
