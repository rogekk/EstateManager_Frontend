import {CreateIssueRequest} from "../requests/IssueRequests";
import {post} from "../../common/network/Api";
import {CommunityId} from "../../common/models/Types";

export async function createNewIssue(communityId: CommunityId, issue: CreateIssueRequest): Promise<void> {
    return await post(`/communities/${communityId.id}/issues`, issue)
}