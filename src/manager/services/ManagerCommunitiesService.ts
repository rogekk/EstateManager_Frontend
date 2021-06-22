import {get} from "../../common/network/Api";
import {CommunitiesResponse, IssuesResponse, OwnersResponse} from "../models/responses/Responses";
import {IssueSearch, OwnerSearch} from "../components/communities/ManagerCommunity";
import {ownerWindow} from "@material-ui/core";

export async function getCommunities(): Promise<CommunitiesResponse> {
    return await get<CommunitiesResponse>("/communities");
}

export async function getOwners(communityId: string, ownerSearch: OwnerSearch): Promise<OwnersResponse>  {
    return await get<OwnersResponse>(`/communities/${communityId}/members?`, {
        email: ownerSearch.email ? ownerSearch.email : "",
        username: ownerSearch.username ? ownerSearch.username : "",
        phone: ownerSearch.phoneNumber ? ownerSearch.phoneNumber : "",
        address: ownerSearch.address ? ownerSearch.address : "",
        fullName: ownerSearch.fullName ? ownerSearch.fullName : "",
    });
}

export async function getIssues( issueSearch: IssueSearch): Promise<IssuesResponse>  {
    return await get<IssuesResponse>(`/communities/issues?`, {
        subject: issueSearch.subject ? issueSearch.subject : "",
        author: issueSearch.createdBy ? issueSearch.createdBy : "",
        createdAt: issueSearch.createdAt ? issueSearch.createdAt : "",
        address: issueSearch.status ? issueSearch.status : "",
        fullName: issueSearch.commentCount ? issueSearch.commentCount : "",
    });
}