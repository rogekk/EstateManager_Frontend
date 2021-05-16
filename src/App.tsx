import React, {useEffect, useState} from 'react';
import './App.css';
import {Box, Typography} from '@material-ui/core';
import {BrowserRouter, Route} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en} from "./Translations";
import {Forums} from "./components/Forums";
import {Community, OwnerProfile, Page} from "./components/Types";
import Cookies from "universal-cookie";
import {getProfile} from "./services/TopicsService";
import {SideDrawer} from "./SideDrawer";
import {CustomAppBar} from "./components/CustomAppBar";
import {TopicComponent} from "./components/TopicComponent";
import {Resolutions} from "./components/Resolutions";
import {Documents} from "./components/Documents";

export const getToken = () => new Cookies().get("token");
export const getOwner = () => new Cookies().get("owner");

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);
    const [community] = useState<Community>({id: {id: "id1"}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>();
    const [currentPage, setPage] = useState<Page>('forums');

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
            <Typography style={{
                color: '#fff',
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                top: '95%',
                marginLeft: '100px',
                zIndex:0,
                textShadow: '1px 1px 4px #000'
            }} variant={'subtitle2'}>
                ©Copyright 2021 The Estate Manager Inc | Terms and Conditions | Privacy Policy | Careers | About | Contact
            </Typography>
            <BrowserRouter>
                <CustomAppBar t={t} setTranslation={setTranslation}/>
                <SideDrawer t={t} community={community} ownerProfile={owner} page={currentPage} setPage={setPage}/>
                <Route exact path="/login" render={() => <Login t={t}/>}/>
                <Route exact path="/dashboard" render={() => <Dashboard t={t} profile={owner}/>}/>
                <Route exact path="/resolutions" render={() => <Resolutions/>}/>
                <Route exact path="/documents" render={() => <Documents/>}/>
                <Route exact path="/forums" render={() => <Forums t={t} community={community}/>}/>
                <Route exact path="/forums/:topicId"
                       render={() => <TopicComponent t={t} communityId={community.id.id}/>}/>
            </BrowserRouter>
        </Box>
    );
}

export default App;
