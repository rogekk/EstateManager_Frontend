import { Typography } from "@material-ui/core"
import { Button, Dropdown, Menu } from "antd"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommunityId, Issue, IssueId } from "../../../common/models/Types"
import { useTranslation } from "../../../common/Translator/UseTranslation"
import { IssueResponse } from "../../models/responses/Responses"
import { getIssue } from "../../services/IssuesService"
import "./IssueDetails.css"

const menu = (<Menu>
        <Menu.Item>
            <a>new</a>
        </Menu.Item>
        <Menu.Item>
            <a>Work in progress</a>
        </Menu.Item>
    </Menu>)

export const IssuesDetails = () => {
    const [issue, setIssue] = useState<Issue>()
    const history = useHistory()
    const { t } = useTranslation()
    const { issueId, communityId } = useParams<{ issueId: string, communityId: string }>()

    async function getIt() {
        return getIssue({ id: issueId}, communityId  )
            .then(iss => {
                setIssue(iss);
            })
    }

    useEffect(
        () => { getIt() }
        , []);

        console.log(issue)



    return <body>
        <div className="issue">
        <div className="issue__settings">
        <Dropdown overlay={menu}>
        <Button className="issue__buttons" onClick={(e) => e.preventDefault()}>
        Status
            </Button>
        </Dropdown>
        <Button className="issue__buttons">
        Edit
            </Button>
            <Button className="issue__buttons">
        Delete
            </Button>

        </div>
        <div className="issue__details">
        <div className="issue__information">
            <h2 className="issue__box-name">Subject</h2>
            <div className="issue__subject">
            <Typography>
                {issue?.subject}
            </Typography>
            </div>
            <h2 className="issue__box-name">Description</h2>
            <div className="issue__description">
            <Typography>
                {issue?.description}
            </Typography>
            </div>
            <h2 className="issue__box-name">Comments</h2>
            <div className="issue__comments">
            <Typography>
            </Typography>
            </div>
            <Button className="issue__answer-button">
                Answer
            </Button>
        </div>
        <div className="issue__author">
        <h2 className="issue__box-name">Author information</h2>
        <div className="issue__author-info">
            <Typography>
            </Typography>
        </div>
        <h2 className="issue__box-name">Attachments</h2>
        <div className="issue__attachments">
            <Typography>
            Attachments 
            </Typography>
            </div>
        </div>
        </div>
    </div>
    </body> 
}
