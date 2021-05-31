import React, {FC, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {Box, Typography} from '@material-ui/core';
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {useStyles} from "./styles/UseStyles";
import {Dashboard} from "./components/Dashboard";
import {Login} from "./components/Login";
import {useLocale} from "./common/i18n/i18n";
import {en, Translation} from "./common/i18n/Translations";
import {Forums} from "./components/Forums";
import {Community, OwnerId, UserProfile, Page} from "./common/models/Types";
import {NavigationPage, SideDrawer, Pages} from "./common/components/SideDrawer";
import {CustomAppBar} from "./components/CustomAppBar";
import {TopicComponent} from "./components/TopicComponent";
import {ResolutionComponent, ResolutionsComponent} from "./components/Resolutions";
import {Documents} from "./components/Documents";
import {getProfile} from "./owners/services/TopicsService";
import {getPersistedToken, getPersistedUser} from "./common/persistance/Persistance";
import {TranslationContext, TranslationProvider, useTranslation} from "./common/i18n/UseTranslation";
import {NavigationItem} from "./components/NavigationItem";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
// import {getOwnerProfile} from "./services/OwnerService";

export const getToken = () => getPersistedToken()
export const getUser: () => OwnerId = () => {
    return {id: getPersistedUser()};
}

function App() {
    const classes = useStyles();
    return (
        <TranslationProvider>
            <Box className={classes.background}>
                <Footer/>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={Pages.login.url} render={() => <Login/>}/>
                        <Route path="/o/*" render={() => <OwnerPortal/>}/>
                        <Route path="/a/*" render={() => <AdminPortal/>}/>
                        <Route path="/m/*" render={() => <ManagerPortal/>}/>
                    </Switch>
                </BrowserRouter>
            </Box>
        </TranslationProvider>
    );
}

export const AdminPortal: FC<{}> = () => {
    return (<div></div>);
}

export const ManagerPortal: FC<{}> = () => {
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}});
    const [user, setUser] = useState<UserProfile>();
    const history = useHistory();
    const {t} = useTranslation();

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login");
            }

            getProfile(getUser())
                .then(r => {
                    setUser(r);
                    setCommunity(r.communities[0]);
                })
        }
        , [])

    return (
        <Box style={{
            height: '100%',
            display: 'flex',
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
        }}>
            <CustomAppBar />
            <SideDrawer community={community} ownerProfile={undefined} >
                <NavigationItem key='docs' icon={InsertDriveFile} name={t.common.navigation.documents} url={'/m/documents'}/>
                <NavigationItem key='dash' icon={DashboardIcon} name={t.common.navigation.dashboard} url={'/m/dashboard'}/>
                <NavigationItem key='resolutions' icon={HowToVote} name={t.common.navigation.resolutions} url={'/m/resolutions'}/>
            </SideDrawer>
            <Switch>
                <Route exact path={'/m/dashboard'} render={() => <Dashboard profile={undefined}/>}/>
                <Route exact path={'/m/resolutions'}
                       render={() => <ResolutionsComponent communityId={community.id}/>}/>
                <Route exact path={'/m/documents'} render={() => <Documents/>}/>
            </Switch>
        </Box>
    )
}
export const OwnerPortal: FC<{}> = () => {
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}});
    const [owner, setOwner] = useState<UserProfile>();
    const history = useHistory();
    const {t} = useTranslation();

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login");
            }

            getProfile(getUser())
                .then(r => {
                    setOwner(r);
                    setCommunity(r.communities[0]);
                })
        }
        , [])

    return (
        <Box style={{
            height: '100%',
            display: 'flex',
            width: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
        }}>
            <CustomAppBar />
            <SideDrawer community={community} ownerProfile={owner} >
                <NavigationItem key='docs' icon={InsertDriveFile} url={'/o/documents'} name={t.common.navigation.documents}/>
                <NavigationItem key='forums' icon={Forum} url={'/o/topics'} name={t.common.navigation.topics}/>
                <NavigationItem key='dash' icon={DashboardIcon} url={'/o/dashboard'} name={t.common.navigation.dashboard}/>
                <NavigationItem key='resolutions' icon={HowToVote} url={'/o/resolutions'} name={t.common.navigation.resolutions}/>
            </SideDrawer>
            <Switch>
                <Route exact path={Pages.dahshboard.url} render={() => <Dashboard profile={owner}/>}/>
                <Route exact path={Pages.resolutions.url}
                       render={() => <ResolutionsComponent communityId={community.id}/>}/>
                <Route exact path={Pages.resolution.url}
                       render={() => <ResolutionComponent communityId={community.id}/>}/>
                <Route exact path={Pages.documents.url} render={() => <Documents/>}/>
                <Route exact path={Pages.forums.url} render={() => <Forums community={community}/>}/>
                <Route exact path="/o/forums/:topicId"
                       render={() => <TopicComponent communityId={community.id.id}/>}/>
            </Switch>
        </Box>
    )

}

export const Footer: FC<{}> = () => {
    const {t} = useTranslation();

    return (<Typography style={{
        color: '#fff',
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        top: '95%',
        marginLeft: '100px',
        zIndex: 0,
        textShadow: '1px 1px 4px #000'
    }} variant={'subtitle2'}>
        {t.common.footer.text}
    </Typography>)

}

export default App;
