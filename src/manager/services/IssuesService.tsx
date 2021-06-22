import { CommunityId, Issue, IssueId, Resolution } from "../../common/models/Types";
import { get } from "../../common/network/Api";
import { IssueResponse } from "../models/responses/Responses";

export async function getIssue(issueId: IssueId): Promise<Issue> {
    const issueResponse: IssueResponse = await get<IssueResponse>(`/communities/issues/${issueId.id}`)

    return {
        id: issueResponse.id,
        subject: issueResponse.subject,
        description: issueResponse.description,
        attachments: issueResponse.attachments,
        createdAt: issueResponse.createdAt,
        createdBy: issueResponse.createdBy,
        status: issueResponse.status,
        commentCount: issueResponse.commentCount,
    } as unknown as Issue;
}