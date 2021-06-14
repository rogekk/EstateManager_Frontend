import { Fab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IssuesResponse } from "../../models/responses/Responses";
import { getIssues } from "../../services/ManagerDashboardServices";
import { IssueListItem } from "./IssuesListCommunity";

export const IssuesCommunities = () => {
    const [issues, setIssues] = useState<IssuesResponse>()

    useEffect(() => {
        getIssues().then(setIssues);
    }, []);

    return <div className={'page-appbar'}>
        {issues?.issues.map((issue) =>
            <IssueListItem issue={issue}/>
        )}
    </div>
}
