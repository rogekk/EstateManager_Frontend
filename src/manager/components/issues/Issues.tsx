import { Divider} from "@material-ui/core";
import { useEffect, useState } from "react";
import { IssuesResponse } from "../../models/responses/Responses";
import { getIssues } from "../../services/ManagerCommunitiesService";
import { IssueSearch } from "../communities/ManagerCommunity";
import { IssueListHeader } from "./IssueListHeader";
import { IssueListItem } from "./IssuesList";
import "./IssuesList.css"

export const Issues = () => {
    const [issues, setIssues] = useState<IssuesResponse>()
    const [issueSearch, setIssueSearch] = useState<IssueSearch>({} as IssueSearch);

    useEffect(() => {
        getIssues(issueSearch).then(setIssues)
    }, [])

    function setSearch(key: keyof IssueSearch, value: string) {
        setIssueSearch((v) => {
                v[key] = value
                getIssues( v).then(setIssues)
                return v
            }
        )
    }

    return <div className="list">
        <div>
            <IssueListHeader name={'Subject'} column={'subject'} setSearch={setSearch}/>
            </div>
            <div>
            <IssueListHeader name={'Author'} column={'createdBy'} setSearch={setSearch}/>
            </div>
            <div>
            <IssueListHeader name={'Create At'} column={'createdAt'} setSearch={setSearch}/>
            </div>
            <div>
            <IssueListHeader name={'Status'} column={'status'} setSearch={setSearch}/>
            </div>
            <div>
            <IssueListHeader name={'Comment Count'} column={'commentCount'} setSearch={setSearch}/>
            </div>
        {issues
            ?.issues
            .flatMap((issue, i) =>
                [i !== 0 && <Divider/>, <IssueListItem issue={issue}/>]
            )}
    </div>

}