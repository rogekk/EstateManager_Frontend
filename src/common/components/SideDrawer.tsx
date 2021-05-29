import React, {FC, SetStateAction} from "react";
import {Translation} from "../i18n/Translations";
import {List, Paper, Typography} from "@material-ui/core";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Community, OwnerProfile} from "../models/Types";
import {NavigationItem} from "../../components/NavigationItem";
import {useHistory, useLocation} from "react-router-dom";
import {LogoutButton} from "./LogoutButton";

export type SetPage = React.Dispatch<SetStateAction<NavigationPage>>

export const SideDrawer: FC<{
    t: Translation,
    community: Community,
    ownerProfile: OwnerProfile | undefined,
    page: NavigationPage,
    setPage: SetPage
}> = ({t, community, ownerProfile, page, setPage}) => {

    const Pages = getPages(t);

    return (
        <Paper style={{
            flexShrink: 0,
            height: '100%',
            width: "200px",
            padding: "16px"
        }}>
            <Typography variant={"h4"}>
                {ownerProfile?.username}
            </Typography>

            <Typography>
                {!!ownerProfile && ownerProfile.communities[0].name.value}
            </Typography>

            <List>
                <NavigationItem key='docs' icon={InsertDriveFile} t={t} page={Pages.documents} setPage={setPage}/>
                <NavigationItem key='forums' icon={Forum} t={t} page={Pages.forums} setPage={setPage}/>
                <NavigationItem key='dash' icon={DashboardIcon} t={t} page={Pages.dahshboard} setPage={setPage}/>
                <NavigationItem key='resolutions' icon={HowToVote} t={t} page={Pages.resolutions} setPage={setPage}/>
            </List>
            <div style={{
                display: "flex",
                width: "100%",
                flexFlow: "row",
                height: "100%",
            }}>
                <div style={{flexShrink: 1}}>

                </div>
                <LogoutButton
                    t={t} setPage={setPage}>
                </LogoutButton>
            </div>
        </Paper>
    );
}

export type NavigationPage = {
    name: string,
    url: string
}

export const getPages = (t: Translation) => {
    const n = t.common.navigation
    return {
        login: {
            name: n.login,
            url: "/login"
        },
        forums: {
            name: n.topics,
            url: "/o/topics"
        },
        documents: {
            name: n.documents,
            url: "/o/documents",
        },
        dahshboard: {
            name: n.dashboard,
            url: "/o/dashboard",
        },
        resolutions: {
            name: n.resolutions,
            url: "/o/resolutions",
        },
        resolution: {
            name: n.resolution,
            url: "/o/resolutions/:resolutionId"
        },
    }
}

export function useNavigation() {
    const history = useHistory();
    const location = useLocation();
    return {
        goTo: (l: string) => history.push(l),
        currentLocation: () => {
            return {
                name: "",
                url: location.pathname
            }
        }
    };
}