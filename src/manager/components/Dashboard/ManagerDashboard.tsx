import {FC, useEffect, useState} from "react";
import {Grid, GridList, GridListTile, Paper, Typography} from "@material-ui/core";
import {getIssues} from "../../services/ManagerDashboardServices";
import {IssuesResponse} from "../../models/responses/Responses";

export const ManagerDashboard: FC<{}> = () => {
    const [issues, setIssues] = useState<IssuesResponse>();

    useEffect(
        () => {
            getIssues()
                .then((issues) => setIssues(issues));
        }
    ,[])


    return (
        <Grid container item xs={12} style={{margin: 96}}>
            <Paper style={{height: 100}}>
                <Typography variant={"h4"} style={{padding: 16}}>
                    {issues?.issues.length} Unresolved issues
                </Typography>
            </Paper>
        </Grid>
    );

}