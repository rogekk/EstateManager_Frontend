import { ButtonBase, Container, Fab, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Issues } from "../../../common/models/Types";
import { BackgroundIcon } from "../../../components/BackgroundIcon";
import { IssueResponse} from "../../models/responses/Responses";


export const IssueListItem = ({issue}: { issue: IssueResponse }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [issues, setissues] = useState<Issues>({issues: []});

    return <Container className={'page-appbar'}>
        <BackgroundIcon icon={HowToVote}/>
        <Fab variant='extended' onClick={() => setOpen(true)} className={'fab'} color={"secondary"}> 
        </Fab>
        {issues.issues.map(r =>
            <ButtonBase key={r.id.id} className={'air row'} onClick={() => history.push(`/m/issues/${r.id.id}`)}>
                <div className={'wrapper'}>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.subject}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.description}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.attachments}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.createdBy}
                    </Typography>
                    <Typography className={'column air air-padding'} noWrap>
                        {r.status}
                    </Typography>
                </div>
            </ButtonBase>
        )}
    </Container>
}
