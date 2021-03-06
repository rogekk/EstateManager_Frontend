import React, {FC, SetStateAction} from "react";
import {Translation} from "../../common/Translator/Translations";
import {List,  Typography} from "@material-ui/core";
import {Community, UserProfile} from "../../common/models/Types";
import {useHistory, useLocation} from "react-router-dom";
import {LogoutButton} from "./LogoutButton";
import {useTranslation} from "../../common/Translator/UseTranslation";
import "./SideDrawer.css"

export type SetPage = React.Dispatch<SetStateAction<NavigationPage>>

export const SideDrawer: FC<{
    community: Community,
    ownerProfile: UserProfile | undefined,
}> = ({community, ownerProfile, children}) => {
    const {t} = useTranslation();

    return (
        <div className="side-bar">
            <Typography>
                {!!ownerProfile && ownerProfile.communities[0].name.value}
            </Typography>

            <List>
                {children}
            </List>
            <div>
                <LogoutButton>
                </LogoutButton>
            </div>
        </div>
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