import { Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CommunityId, IssueId } from "../../../common/models/Types"
import { useTranslation } from "../../../common/Translator/UseTranslation"
import { IssueResponse } from "../../models/responses/Responses"
import { getIssue } from "../../services/IssuesService"


export const IssuesDetails = ({communityId}: { communityId: CommunityId }, {issueId}: { issueId : IssueId }) => {
    const [issue, setIssue] = useState<IssueId>()
    const [hasFetched, setHasFetched] = useState(false)
    const history = useHistory()
    const {t} = useTranslation()

    async function getIt() {
        return getIssue(communityId, issueId)
            .then(iss => {
                setIssue(issue);
            })
    }

    useEffect(
        () => {
            getIt()
        }
    ,[]);

 
    return <div>
       hgsdgbfvcbd
        </div>
}

