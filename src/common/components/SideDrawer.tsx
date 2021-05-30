import React, {FC, SetStateAction} from "react";
import {Translation} from "../i18n/Translations";
import {List, Paper, Typography} from "@material-ui/core";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Community, OwnerProfile} from "../models/Types";
import {NavigationItem} from "../../components/NavigationItem";
import {useHistory, useLocation} from "react-router-dom";
import {LogoutButton} from "./LogoutButton";
import {useTranslation} from "../i18n/UseTranslation";

export type SetPage = React.Dispatch<SetStateAction<NavigationPage>>

export const SideDrawer: FC<{
    community: Community,
    ownerProfile: OwnerProfile | undefined,
    page: NavigationPage,
    setPage: SetPage
}> = ({community, ownerProfile, page, setPage, children}) => {
    const {t} = useTranslation();

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
                {children}
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
                    setPage={setPage}>
                </LogoutButton>
            </div>
        </Paper>
    );
}

export type NavigationPage = {
    name: (t: Translation) => string,
    url: string
}

export const Pages = {
    login: {
        name: (t: Translation) => t.common.navigation.login,
        url: "/login"
    },
    forums: {
        name: (t: Translation) => t.common.navigation.topics,
        url: "/o/topics"
    },
    documents: {
        name: (t: Translation) => t.common.navigation.documents,
        url: "/o/documents",
    },
    dahshboard: {
        name: (t: Translation) => t.common.navigation.dashboard,
        url: "/o/dashboard",
    },
    resolutions: {
        name: (t: Translation) => t.common.navigation.resolutions,
        url: "/o/resolutions",
    },
    resolution: {
        name: (t: Translation) => t.common.navigation.resolution,
        url: "/o/resolutions/:resolutionId"
    },
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