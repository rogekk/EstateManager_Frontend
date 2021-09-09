import { ButtonBase, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IssueResponse } from "../../models/responses/Responses";
import "./IssuesList.css"
import moment from "moment/moment.js";



export const IssueListItem = ({ issue }: { issue: IssueResponse }) => {
    const history = useHistory();

    return <div className="list__issue_item">
        <ButtonBase className= "list__issue_button" key={issue.id}  onClick={() => history.push(`/m/communities/${issue.communityId}/issues/${issue.id}`)}>
            <Typography className="list__column list__large">
                {issue.subject}
            </Typography>
            <Typography className="list__column list__small">
                {issue.createdBy.username}
            </Typography>
            <Typography className="list__column list__small">
                {moment(issue.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <Typography className="list__column list__small">
                {issue.status}
            </Typography>
            <Typography className="list__column list__small">
                {issue.commentCount}
            </Typography>
       
    </ButtonBase>
</div>
}
