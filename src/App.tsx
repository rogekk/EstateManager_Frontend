import React, {FC, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {Box, Typography} from '@material-ui/core';
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./i18n";
import {en, Translation} from "./Translations";
import {Forums} from "./components/Forums";
import {Community, OwnerId, OwnerProfile, Page} from "./components/Types";
import Cookies from "universal-cookie";
import {NavigationPage, Pages, SideDrawer} from "./SideDrawer";
import {CustomAppBar} from "./components/CustomAppBar";
import {TopicComponent} from "./components/TopicComponent";
import {ResolutionComponent, ResolutionsComponent} from "./components/Resolutions";
import {Documents} from "./components/Documents";
import {getProfile} from "./services/TopicsService";
// import {getOwnerProfile} from "./services/OwnerService";

export const getToken = () => new Cookies().get("token");
export const getOwner: () => OwnerId = () => {
    return {id: new Cookies().get("owner")};
}

// export const getProfile: () => Promise<OwnerProfile> = async () => {
//     const profile = JSON.parse(new Cookies().get("profile")) as OwnerProfile;
//     if (profile == null) {
//         return await getOwnerProfile(getOwner());
//     } else {
//         return profile;
//     }
// }

function App() {
    const classes = useStyles();
    const [t, setTranslation] = useLocale(en);

    return (
        <Box className={classes.background}>
            <Typography style={{
                color: '#fff',
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                top: '95%',
                marginLeft: '100px',
                zIndex: 0,
                textShadow: '1px 1px 4px #000'
            }} variant={'subtitle2'}>
                ©Copyright 2021 The Estate Manager Inc | Terms and Conditions | Privacy Policy | Careers | About |
                Contact
            </Typography>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" render={() => <Login t={t}/>}/>
                    <Route path="/o/*" render={() => <OwnerPortal/>}/>
                </Switch>
            </BrowserRouter>
        </Box>
    );
}

export const AdminPortal: FC<{}> = () => {
    return (<div></div>);
}

export const ManagerPortal: FC<{}> = () => {
    return (<div></div>);
}
export const OwnerPortal: FC<{}> = () => {
    const [t, setTranslation] = useLocale(en);
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>();
    const [currentPage, setPage] = useState<NavigationPage>(Pages.forums);
    const [done, setDone] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() =>{
        history.push(currentPage.url);
    }, [currentPage])

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login");
            }

            if (owner == null && getOwner() != null) {
                console.log("doing it$$$$ " + getOwner());
            }

            if (!done) {
                getProfile(getOwner())
                    .then(r => {
                        setOwner(r);
                        setCommunity(r.communities[0]);
                        setDone(true);
                    })

            }
        }
    )

    return (
        <Box style={{
            height: '100%',
            display: 'flex',
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
        }}>
            <CustomAppBar t={t} setTranslation={setTranslation} page={currentPage}/>
            <SideDrawer t={t} community={community} ownerProfile={owner} page={currentPage} setPage={setPage}/>
            <Switch>
                <Route exact path={Pages.dahshboard.url} render={() => <Dashboard t={t} profile={owner}/>}/>
                <Route exact path={Pages.resolutions.url} render={() => <ResolutionsComponent communityId={community.id}/>}/>
                <Route exact path={Pages.resolution.url}
                       render={() => <ResolutionComponent communityId={community.id}/>}/>
                <Route exact path={Pages.documents.url} render={() => <Documents/>}/>
                <Route exact path={Pages.forums.url} render={() => <Forums t={t} community={community}/>}/>
                <Route exact path="/o/forums/:topicId"
                       render={() => <TopicComponent t={t} communityId={community.id.id}/>}/>
            </Switch>
        </Box>
    )
}

export default App;
