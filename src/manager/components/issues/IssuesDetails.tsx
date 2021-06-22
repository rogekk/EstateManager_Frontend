import { Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommunityId, IssueId } from "../../../common/models/Types"
import { useTranslation } from "../../../common/Translator/UseTranslation"
import { IssueResponse } from "../../models/responses/Responses"
import { getIssue } from "../../services/IssuesService"

export const IssuesDetails = () => {
    const [issue, setIssue] = useState<IssueId>()
    const history = useHistory()
    const { t } = useTranslation()
    const { issueId } = useParams<{ issueId: string }>()

    async function getIt() {
        return getIssue({ id: issueId })
            .then(iss => {
                setIssue(issue);
            })
    }

    useEffect(
        () => { getIt() }
        , []);

    return <div className="page-appbar">
        hgsdgbfvcbd
    </div>
}
