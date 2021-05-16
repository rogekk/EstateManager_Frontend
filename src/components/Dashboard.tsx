import React from "react";
import {Container} from "@material-ui/core";
import {Translation} from "../Translations";
import {OwnerProfile} from "./Types";
import {Dashboard as DashboardIcon} from "@material-ui/icons"
import {BackgroundIcon} from "./BackgroundIcon";

export const Dashboard: React.FC<{
    t: Translation,
    profile: OwnerProfile | null | undefined
}> = ({t, profile}) => {
    return <Container style={{marginTop: '100px', display: 'flex'}}>
        <BackgroundIcon icon={DashboardIcon}/>
        {profile ? (<div> Hello: {profile.username} </div>) : <div/>}
    </Container>
}

