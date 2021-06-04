import {FC} from "react";
import {IssueResponse} from "../../../manager/models/responses/Responses";
import {Paper, Typography} from "@material-ui/core";

export const OwnerIssueListItem: FC<{ issue: IssueResponse }> = ({issue}) => {
    return(
    <Paper style={{height: 100}}>
        <Typography>
            {issue.description}
        </Typography>
    </Paper>
    )

}