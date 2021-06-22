import React, {FC, useEffect, useState} from "react";
import {Community, UserProfile} from "../common/models/Types";
import {Route, Switch} from "react-router-dom";
import {useTranslation} from "../common/Translator/UseTranslation";
import {getProfile} from "../owners/services/TopicsService";
import {Box} from "@material-ui/core";
import {CustomAppBar} from "../components/DashboardTSX/CustomAppBar";
import {SideDrawer} from "../components/DashboardTSX/SideDrawer";
import {NavigationItem} from "../components/DashboardTSX/NavigationItem";
import {Dashboard as DashboardIcon, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Documents} from "../components/Documents/Documents";
import {ManagerDashboard} from "./components/Dashboard/ManagerDashboard";
import {ManagerCommunities} from "./components/community/ManagerCommunities";
import {ManagerCommunity} from "./components/community/ManagerCommunity";
import {ManagerResolutions} from "./resolutions/Resolutions";
import { IssuesCommunities } from "./components/issues/CommunityIssues";
import { getToken, getUser } from "../App";
import {FaToolbox, FaVoteYea, IoDocuments, MdDashboard, RiCommunityFill, RiCommunityLine} from "react-icons/all";

export const ManagerPortal: FC<{}> = () => {
    const [community, setCommunity] = useState<Community>({id: {id: ""}, name: {value: ""}})
    const [user, setUser] = useState<UserProfile>()
    const {t} = useTranslation()
    const [showDrawer, setShowDrawer] = useState(false)

    useEffect(
        () => {
            if (getToken() == null && window.location.pathname !== "/login") {
                window.location.replace("/login")
            }

            getProfile(getUser())
                .then(r => {
                    setUser(r)
                    setCommunity(r.communities[0])
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
            <CustomAppBar menuClicked={() => setShowDrawer((state) => !state)}/>
            <SideDrawer community={community} ownerProfile={undefined}>
                <NavigationItem key='dash' icon={MdDashboard} name={t.common.navigation.dashboard}
                                url={'/m/dashboard'}/>
                <NavigationItem key='communities' icon={RiCommunityFill} name={t.common.navigation.communities}
                                url={'/m/communities'} />
                <NavigationItem key='resolutions' icon={FaVoteYea} name={t.common.navigation.resolutions}
                                url={'/m/resolutions'} />
                <NavigationItem key='issues' icon={FaToolbox} name={t.common.navigation.issues}
                                url={'/m/issues'} />
                <NavigationItem key='docs' icon={IoDocuments} name={t.common.navigation.documents}
                                url={'/m/documents'}/>
    
            </SideDrawer>
            <Switch>
                <Route exact path={'/m/dashboard'} render={() => <ManagerDashboard/>}/>
                <Route exact path={'/m/resolutions'} render={() => <ManagerResolutions communityId={community.id}/>}/>
                <Route exact path={'/m/documents'} render={() => <Documents/>}/>
                <Route exact path={'/m/communities'} render={() => <ManagerCommunities/>}/>
                <Route exact path={'/m/communities/:communityId/*'} render={() => <ManagerCommunity/>}/>
                <Route exact path={'/m/issues'} render={() => <IssuesCommunities/>}/>
            </Switch>
        </Box>
    )
}