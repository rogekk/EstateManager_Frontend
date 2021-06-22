import { Typography } from "@material-ui/core"
import { Button, Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommunityId, Issue, IssueId } from "../../../common/models/Types"
import { useTranslation } from "../../../common/Translator/UseTranslation"
import { IssueResponse } from "../../models/responses/Responses"
import { getIssue } from "../../services/IssuesService"

const menu = (<Menu>
        <Menu.Item>
            <a>new</a>
        </Menu.Item>
        <Menu.Item>
            <a>new</a>
        </Menu.Item>
    </Menu>)

export const IssuesDetails = () => {
    const [issue, setIssue] = useState<Issue>()
    const history = useHistory()
    const { t } = useTranslation()
    const { issueId } = useParams<{ issueId: string }>()

    async function getIt() {
        return getIssue({ id: issueId })
            .then(iss => {
                setIssue(iss);
            })
    }

    useEffect(
        () => { getIt() }
        , []);


    return <div className="page-appbar">
        <div className="editBar">
        <Dropdown overlay={menu}>
                <Button onClick={(e) => e.preventDefault()}>
        Status
            </Button>
        </Dropdown>
        </div>
        <div>
            <Typography>
                {issue?.subject}
            </Typography>
            <Typography>
                {issue?.description}
            </Typography>
        </div>
    </div>
}
