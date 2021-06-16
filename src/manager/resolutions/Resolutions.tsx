import {FC, useEffect, useState} from "react";
import {Button, ButtonBase, Container, Fab, List, ListItem, Paper, Typography} from "@material-ui/core";
import {Add, HowToVote} from "@material-ui/icons";
import {useHistory, useParams} from "react-router-dom";
import {BackgroundIcon} from "../../components/DashboardTSX/BackgroundIcon";
import {getResolution, getResolutions, postVote} from "../../owners/services/ResolutionsService";
import {CommunityId, Resolution, Resolutions} from "../../common/models/Types";
import {useTranslation} from "../../common/Translator/UseTranslation";
import {CreateNewResolution} from "./CreateNewResolution";

export const ManagerResolutions = ({communityId}: { communityId: CommunityId }) => {
    const [resolutions, setResolutions] = useState<Resolutions>({resolutions: []})
    const [hasFetched, setHasFetched] = useState(false)
    const history = useHistory()
    const {t} = useTranslation()

    async function getIt() {
        return getResolutions(communityId)
            .then(res => {
                setResolutions(res);
            })
    }

    useEffect(
        () => {
            getIt()
        }
    ,[]);

    return <Container className={'page-appbar'}>
        <BackgroundIcon icon={HowToVote}/>
        <Fab variant='extended' onClick={() => history.push('newresolution')} className={'fab'} color={"secondary"}>
            <Add/>
            {t.owner.forums.create}
        </Fab>
        {resolutions.resolutions.map(r =>
            <ButtonBase key={r.id.id} className={'air row'} onClick={() => history.push(`/resolutions/${r.id.id}`)}>
                <div className={'wrapper'}>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.number}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.subject}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.sharesAgainst}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.sharesPro}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.result}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.createdAt}
                    </Typography>
                </div>
            </ButtonBase>
        )}
    </Container>

}

export const ResolutionComponent: React.FC<{
    communityId: CommunityId,
}> = ({communityId}) => {
    const [resolution, setResolution] = useState<Resolution>();
    const {resolutionId} = useParams<{ resolutionId: string }>();

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
        <BackgroundIcon icon={HowToVote}/>
        {resolution ?
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
            : <div/>
        }
        <Button onClick={() => postVote(communityId, {id: resolutionId}, 'pro')}>PRO</Button>
        <Button onClick={() => postVote(communityId, {id: resolutionId}, 'against')}>AGAINST</Button>
    </Container>
}
