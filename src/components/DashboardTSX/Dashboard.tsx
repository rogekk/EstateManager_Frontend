import React from "react";
import {Container, Typography} from "@material-ui/core";
import {Translation} from "../../common/Translator/Translations";
import {UserProfile} from "../../common/models/Types";
import {Dashboard as DashboardIcon} from "@material-ui/icons"
import {BackgroundIcon} from "./BackgroundIcon";
import {useTranslation} from "../../common/Translator/UseTranslation";

export const Dashboard: React.FC<{
    profile: UserProfile | null | undefined
}> = ({profile}) => {
    const {t} = useTranslation();
    return <Container>
        {profile ? (<Typography> {t.common.dashboard.title(profile.username)} </Typography>) : <div/>}
    </Container>
}

