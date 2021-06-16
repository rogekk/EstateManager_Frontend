import { Fab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IssueResponse, IssuesResponse } from "../../models/responses/Responses";
import { getIssues } from "../../services/ManagerDashboardServices";
import IssuesHeader from "./IssuesHeader";
import { IssueListItem } from "./IssuesListCommunity";

export const IssuesCommunities = () => {
    const [issues, setIssues] = useState<IssuesResponse>()
    
    const [issue] = useState<IssueResponse>()


    useEffect(() => {
        getIssues().then(setIssues);
    }, []);

    return  <div>
        <IssuesHeader issues={issues}/>
    </div>
    
}