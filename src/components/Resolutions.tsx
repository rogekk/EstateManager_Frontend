import {FC, useEffect, useState} from "react";
import {Button, Container, List, ListItem, Paper, Typography} from "@material-ui/core";
import {BackgroundIcon} from "./BackgroundIcon";
import {HowToVote} from "@material-ui/icons";
import {getResolution, getResolutions, postVote} from "../owners/services/ResolutionsService";
import {CommunityId, Resolution, ResolutionId, Resolutions, Vote} from "../common/models/Types";
import {useHistory, useParams} from "react-router-dom";

export const ResolutionsComponent: React.FC<{
    communityId: CommunityId,
}> = ({communityId}) => {
    const [resolutions, setResolutions] = useState<Resolutions>({resolutions: []});
    const [hasFetched, setHasFetched] = useState(false);
    const history = useHistory();

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
        <List style={{width: '600px'}}>
            {resolutions.resolutions.map(r =>
                <ListItem button onClick={() => history.push(`/resolutions/${r.id.id}`)}>
                    <Paper>
                    <Typography>
                        {r.subject}
                    </Typography>
                    <Typography>
                        {r.description}
                    </Typography>
                </Paper>
                </ListItem>
            )}
        </List>
    </Container>

}

export const ResolutionComponent: React.FC<{
    communityId: CommunityId,
}> = ({communityId}) => {
    const [resolution, setResolution] = useState<Resolution>();
    const {resolutionId} = useParams<{resolutionId: string}>();

    useEffect(
        () => {
            if (resolution == null) {
                getResolution(communityId, {id: resolutionId})
                    .then(res => {
                        setResolution(res);
                    })
            }
        }
    );

    return <Container style={{marginTop: "96px"}}>
        <BackgroundIcon icon={HowToVote}></BackgroundIcon>
        { resolution ?
                    <Paper>
                        <Typography>
                            {resolution.subject}
                        </Typography>
                        <Typography>
                            {resolution.description}
                        </Typography>
                        <Typography>
                            PRO: {resolution.sharesPro}
                        </Typography>
                        <Typography>
                            Against: {resolution.sharesAgainst}
                        </Typography>
                    </Paper>
            : <div></div>
        }
        <Button onClick={() => postVote(communityId, {id: resolutionId}, 'pro')}>PRO</Button>
        <Button onClick={() => postVote(communityId, {id: resolutionId}, 'against')}>AGAINST</Button>
    </Container>
}