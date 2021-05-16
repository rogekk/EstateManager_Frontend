import React, {FC, SetStateAction} from "react";
import {Translation} from "./Translations";
import {List, Paper, Typography} from "@material-ui/core";
import {Dashboard as DashboardIcon, Forum, HowToVote, InsertDriveFile} from "@material-ui/icons";
import {Community, OwnerProfile, Page} from "./components/Types";
import {NavigationItem} from "./components/NavigationItem";

export const SideDrawer: FC<{
    t: Translation,
    community: Community,
    ownerProfile: OwnerProfile | undefined,
    page: Page,
    setPage: React.Dispatch<SetStateAction<Page>>
}> = ({t, community, ownerProfile, page, setPage}) => {
    return (
        <Paper style={{flexShrink: 0, width: "200px"}}>
            <Typography>
                {ownerProfile?.username}
            </Typography>

            <Typography>
                {!!ownerProfile && ownerProfile.communities[0].name.value}
            </Typography>
            <List>
                <NavigationItem key='docs' icon={InsertDriveFile} t={t} page={[page, "/documents", "Documents"]}
                                setPage={setPage}/>
                <NavigationItem key='forums' icon={Forum} t={t} page={[page, "/forums", "Forums"]}
                                setPage={setPage}/>
                <NavigationItem key='dash' icon={DashboardIcon} t={t} page={[page, "/dashboard", "Dashboard"]}
                                setPage={setPage}/>
                <NavigationItem key='resolutions' icon={HowToVote} t={t} page={[page, "/resolutions", "Resolutions"]}
                                setPage={setPage}/>
            </List>
        </Paper>
    );
}