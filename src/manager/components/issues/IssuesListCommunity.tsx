import { ButtonBase, Typography } from "@material-ui/core";
import { Route, Switch, useHistory } from "react-router-dom";
import { IssueResponse } from "../../models/responses/Responses";

import moment from "moment/moment.js";
import { IssuesDetails } from "./IssuesDetails";



export const IssueListItem = ({ issue }: { issue: IssueResponse }) => {
    const history = useHistory();

    return <ButtonBase key={issue.id} className={'air row'} onClick={() => history.push(`/m/issues/${issue.id}`)}>
             <div className={'wrapper'}>
            <Typography className={'column air air-padding'} noWrap>
                {issue.subject}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.createdBy.username}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {moment(issue.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.status}
            </Typography>
            <Typography className={'column air air-padding'} noWrap>
                {issue.commentCount}
            </Typography>
        </div>
    </ButtonBase>
  
    
}
