import React from "react";
import {Container, Typography} from "@material-ui/core";
import {Translation} from "../common/i18n/Translations";
import {OwnerProfile} from "../common/models/Types";
import {Dashboard as DashboardIcon} from "@material-ui/icons"
import {BackgroundIcon} from "./BackgroundIcon";
import {useTranslation} from "../common/i18n/UseTranslation";

export const Dashboard: React.FC<{
    profile: OwnerProfile | null | undefined
}> = ({profile}) => {
    const {t} = useTranslation();
    return <Container style={{marginTop: '100px', display: 'flex'}}>
        <BackgroundIcon icon={DashboardIcon}/>
        {profile ? (<Typography> {t.common.dashboard.title(profile.username)} </Typography>) : <div/>}
    </Container>
}

