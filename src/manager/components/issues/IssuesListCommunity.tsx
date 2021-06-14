import {ButtonBase, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {IssueResponse} from "../../models/responses/Responses";


export const IssueListItem = ({issue}: { issue: IssueResponse }) => {
    const history = useHistory();

    return <ButtonBase key={issue.id} className={'air row'} onClick={() => history.push(`/m/issues/${issue.id}`)}>
        <div className={'wrapper'}>
            <Typography className={'column air air-padding'} noWrap>
                {issue.subject}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.description}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.attachments}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.createdBy.username}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.status}
            </Typography>
        </div>
    </ButtonBase>
}
