import React, {FC, SetStateAction} from "react";
import {Translation} from "./Translations";
import {List, Paper, Typography} from "@material-ui/core";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Community, OwnerProfile, Page} from "./components/Types";
import {NavigationItem} from "./components/NavigationItem";
import {useHistory, useLocation} from "react-router-dom";

export const SideDrawer: FC<{
    t: Translation,
    community: Community,
    ownerProfile: OwnerProfile | undefined,
    page: NavigationPage,
    setPage: React.Dispatch<SetStateAction<NavigationPage>>
}> = ({t, community, ownerProfile, page, setPage}) => {
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
        </Paper>
    );
}

export type NavigationPage = {
    name: string,
    url: string
}

export const Pages = {
    login: {
        name: "Login",
        url: "/login"
    },
    forums: {
        name: "Topics",
        url: "o/topics"
    },
    documents: {
        name: "Documents",
        url: "/o/documents",
},
    dahshboard: {
        name: "Dashboard",
        url: "/o/dashboard",
    },
    resolutions: {
        name: "Resolutions",
        url: "/o/resolutions",
    },
    resolution: {
        name: "Resolution",
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