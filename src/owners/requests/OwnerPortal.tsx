import React, {FC, useEffect, useState} from "react";
import {Community, UserProfile} from "../../common/models/Types";
import {Route, Switch, useHistory} from "react-router-dom";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {getProfile} from "../services/TopicsService";
import {Box} from "@material-ui/core";
import {CustomAppBar} from "../../components/DashboardTSX/CustomAppBar";
import {Pages, SideDrawer} from "../../components/DashboardTSX/SideDrawer";
import {NavigationItem} from "../../components/DashboardTSX/NavigationItem";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Dashboard} from "../../components/DashboardTSX/Dashboard";
import {ResolutionComponent, ResolutionsComponent} from "../../components/Resolutions/Resolutions";
import {Documents} from "../../components/Documents/Documents";
import {Forums} from "../../components/Forum/Forums";
import {OwnerIssues} from "../components/issues/OwnerIssues";
import {TopicComponent} from "../../components/Forum/TopicComponent";
import { getToken, getUser } from "../../App";
import {FaToolbox, FaVoteYea, IoDocuments, MdDashboard, MdForum} from "react-icons/all";


export const OwnerPortal: FC<{}> = () => {
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}});
    const [owner, setOwner] = useState<UserProfile>();
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

    return  <Box className="manager">
            <CustomAppBar/>
            <SideDrawer community={community} ownerProfile={owner}>
                <NavigationItem key='dash' icon={MdDashboard} url={'/o/dashboard'} name={t.common.navigation.dashboard} />
                <NavigationItem key='resolutions' icon={FaVoteYea} url={'/o/resolutions'} name={t.common.navigation.resolutions} />
                <NavigationItem key='issues' icon={FaToolbox} url={'/o/issues'} name={t.common.navigation.issues} />
                <NavigationItem key='docs' icon={IoDocuments} url={'/o/documents'} name={t.common.navigation.documents} />
                <NavigationItem key='forums' icon={MdForum} url={'/o/topics'} name={t.common.navigation.topics} />
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
}