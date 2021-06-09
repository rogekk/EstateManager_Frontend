import React, {FC, useEffect, useState} from "react";
import {Community, UserProfile} from "../../common/models/Types";
import {Route, Switch, useHistory} from "react-router-dom";
import {useTranslation} from "../../common/i18n/UseTranslation";
import {getProfile} from "../services/TopicsService";
import {Box} from "@material-ui/core";
import {CustomAppBar} from "../../components/CustomAppBar";
import {Pages, SideDrawer} from "../../common/components/SideDrawer";
import {NavigationItem} from "../../components/NavigationItem";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Dashboard} from "../../components/Dashboard";
import {ResolutionComponent, ResolutionsComponent} from "../../components/Resolutions";
import {Documents} from "../../components/Documents";
import {Forums} from "../../components/Forums";
import {OwnerIssues} from "../components/issues/OwnerIssues";
import {TopicComponent} from "../../components/TopicComponent";
import {getToken, getUser} from "../../App";

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
            <CustomAppBar/>
            <SideDrawer community={community} ownerProfile={owner}>
                <NavigationItem key='docs' icon={InsertDriveFile} url={'/o/documents'}
                                name={t.common.navigation.documents}/>
                <NavigationItem key='forums' icon={Forum} url={'/o/topics'} name={t.common.navigation.topics}/>
                <NavigationItem key='dash' icon={DashboardIcon} url={'/o/dashboard'}
                                name={t.common.navigation.dashboard}/>
                <NavigationItem key='resolutions' icon={HowToVote} url={'/o/resolutions'}
                                name={t.common.navigation.resolutions}/>
                <NavigationItem key='issues' icon={HowToVote} url={'/o/issues'} name={t.common.navigation.issues}/>
            </SideDrawer>
            <Switch>
                <Route exact path={Pages.dahshboard.url} render={() => <Dashboard profile={owner}/>}/>
                <Route exact path={Pages.resolutions.url}
                       render={() => <ResolutionsComponent communityId={community.id}/>}/>
                <Route exact path={Pages.resolution.url}
                       render={() => <ResolutionComponent communityId={community.id}/>}/>
                <Route exact path={Pages.documents.url} render={() => <Documents/>}/>
                <Route exact path={Pages.forums.url} render={() => <Forums community={community}/>}/>
                <Route exact path="/o/issues" render={() => <OwnerIssues community={community}/>}/>
                <Route exact path="/o/forums/:topicId"
                       render={() => <TopicComponent communityId={community.id.id}/>}/>
            </Switch>
        </Box>
    )

}