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
import {Community, OwnerId, OwnerProfile, Page} from "./common/models/Types";
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
export const getOwner: () => OwnerId = () => {
    return {id: getPersistedUser()};
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
    return (
        <TranslationProvider>
            <Box className={classes.background}>
                <Footer></Footer>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={Pages.login.url} render={() => <Login/>}/>
                        <Route path="/o/*" render={() => <OwnerPortal/>}/>
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
    return (<div></div>);
}
export const OwnerPortal: FC<{}> = () => {
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}});
    const [owner, setOwner] = useState<OwnerProfile>();
    const [currentPage, setPage] = useState<NavigationPage>(Pages.forums);
    const [done, setDone] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
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
            <CustomAppBar page={currentPage}/>
            <SideDrawer community={community} ownerProfile={owner} page={currentPage} setPage={setPage}>
                <NavigationItem key='docs' icon={InsertDriveFile} page={Pages.documents} setPage={setPage}/>
                <NavigationItem key='forums' icon={Forum} page={Pages.forums} setPage={setPage}/>
                <NavigationItem key='dash' icon={DashboardIcon} page={Pages.dahshboard} setPage={setPage}/>
                <NavigationItem key='resolutions' icon={HowToVote} page={Pages.resolutions} setPage={setPage}/>
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
