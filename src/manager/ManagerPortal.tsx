import React, {FC, useEffect, useState} from "react";
import {Community, UserProfile} from "../common/models/Types";
import {Route, Switch, useHistory} from "react-router-dom";
import {useTranslation} from "../common/i18n/UseTranslation";
import {getProfile} from "../owners/services/TopicsService";
import {Box} from "@material-ui/core";
import {CustomAppBar} from "../components/CustomAppBar";
import {SideDrawer} from "../common/components/SideDrawer";
import {NavigationItem} from "../components/NavigationItem";
import {Dashboard as DashboardIcon, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Dashboard} from "../components/Dashboard";
import {ResolutionsComponent} from "../components/Resolutions";
import {Documents} from "../components/Documents";
import {getToken, getUser} from "../App";
import {ManagerDashboard} from "./components/ManagerDashboard";

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
            <CustomAppBar/>
            <SideDrawer community={community} ownerProfile={undefined}>
                <NavigationItem key='docs' icon={InsertDriveFile} name={t.common.navigation.documents}
                                url={'/m/documents'}/>
                <NavigationItem key='dash' icon={DashboardIcon} name={t.common.navigation.dashboard}
                                url={'/m/dashboard'}/>
                <NavigationItem key='resolutions' icon={HowToVote} name={t.common.navigation.resolutions}
                                url={'/m/resolutions'}/>
            </SideDrawer>
            <Switch>
                <Route exact path={'/m/dashboard'} render={() => <ManagerDashboard />}/>
                <Route exact path={'/m/resolutions'}
                       render={() => <ResolutionsComponent communityId={community.id}/>}/>
                <Route exact path={'/m/documents'} render={() => <Documents/>}/>
            </Switch>
        </Box>
    )
}