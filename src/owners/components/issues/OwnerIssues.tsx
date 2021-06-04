import {FC, useEffect, useState} from "react";
import {Community} from "../../../common/models/Types";
import {Forum} from "@material-ui/icons";
import {getIssues} from "../../../manager/services/ManagerDashboardServices";
import {IssuesResponse} from "../../../manager/models/responses/Responses";
import {Container, Fab, List, Paper, Typography} from "@material-ui/core";
import {useTranslation} from "../../../common/i18n/UseTranslation";
import {BackgroundIcon} from "../../../components/BackgroundIcon";
import {CreateNewIssue} from "./CreateNewIssue";
import {OwnerIssueListItem} from "./OwnerIssueListItem";

export const OwnerIssues: FC<{ community: Community }> = ({community}) => {
    const [issues, setIssues] = useState<IssuesResponse>();
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getIssues()
            .then(setIssues)

    }, []);

    return <Container style={{
        maxHeight: "100%",
        overflow: "auto",
        paddingTop: '96px'
    }}>

        <BackgroundIcon icon={Forum}/>

        <CreateNewIssue open={open} communityId={community.id} setOpen={setOpen} onCreated={() =>
            getIssues().then(setIssues)} handleClose={handleClose}/>

        <List style={{height: '100%', width: '100%'}}>

            {issues?.issues.map((issue) => {
                console.log(issue.description);
                return <OwnerIssueListItem issue={issue} />
            })}
        </List>
        <Fab variant='extended' onClick={() => setOpen(true)}>
            Create Issue

        </Fab>
    </Container>
}

