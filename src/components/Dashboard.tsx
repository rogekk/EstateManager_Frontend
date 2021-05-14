import React from "react";
import {Container} from "@material-ui/core";
import {Translation} from "../Translations";
import {OwnerProfile} from "./Types";

export const Dashboard: React.FC<{t: Translation, profile: OwnerProfile | null | undefined}> = ({t, profile}) => {
    return <Container style={{marginTop: '100px'}}>
        {profile ? (<div> Hello: {profile.username} </div>) : <div/> }
    </Container>
}