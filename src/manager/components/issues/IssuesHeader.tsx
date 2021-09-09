import React from 'react'
import {IssuesResponse} from "../../models/responses/Responses";

export default function IssuesHeader({issues}: { issues: IssuesResponse }) {

    return (
        <div>
            <thead>
            <td>Subject</td>
            <td>Author</td>
            <td>Created At</td>
            <td>Status</td>
            <td>CommentCount</td>
            </thead>
            <tbody>
            {
                issues.issues.map((issue) =>
                    <tr>
                        <td>{issue.subject}</td>
                        <td>{issue.createdBy.username}</td>
                        <td>{issue.createdAt}</td>
                        <td>{issue.status}</td>
                        <td>{issue.commentCount}</td>
                    </tr>
                )
            }
            </tbody>
        </div>
    )
}



