import { Divider} from "@material-ui/core";
import { useEffect, useState } from "react";
import { IssuesResponse } from "../../models/responses/Responses";
import { getIssues } from "../../services/ManagerCommunitiesService";
import { IssueSearch } from "../community/ManagerCommunity";
import { IssueListHeader } from "./IssueListHeader";
import { IssueListItem } from "./IssuesListCommunity";

export const IssuesCommunities = () => {
    const [issues, setIssues] = useState<IssuesResponse>()

    const [issueSearch, setIssueSearch] = useState<IssueSearch>({} as IssueSearch);


    useEffect(() => {
        getIssues( issueSearch).then(setIssues)
    }, [])


    function setSearch(key: keyof IssueSearch, value: string) {
        setIssueSearch((v) => {
                v[key] = value
                getIssues( v).then(setIssues)
                return v
            }
        )
    }

    return <div className={'page-appbar'}>
        <div className={'wrapper'}>
            <IssueListHeader name={'Subject'} column={'subject'} setSearch={setSearch}/>
            <IssueListHeader name={'Author'} column={'createdBy'} setSearch={setSearch}/>
            <IssueListHeader name={'Create At'} column={'createdAt'} setSearch={setSearch}/>
            <IssueListHeader name={'Status'} column={'status'} setSearch={setSearch}/>
            <IssueListHeader name={'Comment Count'} column={'commentCount'} setSearch={setSearch}/>
        </div>
        {issues
            ?.issues
            .flatMap((issue, i) =>
                [i !== 0 && <Divider/>, <IssueListItem issue={issue}/>]
            )}
    </div>

}