import {FC, useEffect, useState} from "react";
import {Container, List, Paper, Typography} from "@material-ui/core";
import {BackgroundIcon} from "./BackgroundIcon";
import {HowToVote} from "@material-ui/icons";
import {getResolutions} from "../services/ResolutionsService";
import {CommunityId, Resolutions} from "./Types";

export const ResolutionsComponent: React.FC<{
    communityId: CommunityId,
}> = ({communityId}) => {
    const [resolutions, setResolutions] = useState<Resolutions>({resolutions: []});
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(
        () => {
            if (!hasFetched) {
                getResolutions(communityId)
                    .then(res => {
                        setHasFetched(true);
                        setResolutions(res);
                    })
            }
        }
    );

    return <Container style={{marginTop: "96px"}}>
        <BackgroundIcon icon={HowToVote}></BackgroundIcon>
        <List>
            {resolutions.resolutions.map(r => <Paper>
                <Typography>
                    {r.subject}
                    {r.description}
                </Typography>
            </Paper>)}
        </List>
    </Container>

}