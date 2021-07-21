import { ButtonBase, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IssueResponse } from "../../models/responses/Responses";
import "./IssuesList.css"
import moment from "moment/moment.js";



export const IssueListItem = ({ issue }: { issue: IssueResponse }) => {
    const history = useHistory();

    return <ButtonBase  key={issue.id}  onClick={() => history.push(`/m/communities/${issue.communityId}/issues/${issue.id}`)}>
        <div className= "list__issues">
            <Typography >
                {issue.subject}
            </Typography>
            <Typography  >
                {issue.createdBy.username}
            </Typography>
            <Typography>
                {moment(issue.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <Typography >
                {issue.status}
            </Typography>
            <Typography >
                {issue.commentCount}
            </Typography>
        </div>
    </ButtonBase>
}
