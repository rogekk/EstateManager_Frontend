import {get} from "../../common/network/Api";
import {CommunitiesResponse, OwnersResponse} from "../models/responses/Responses";

export async function getCommunities(): Promise<CommunitiesResponse> {
    return await get<CommunitiesResponse>("/communities");
}

export async function getOwners(communityId: string, params: {
    username: string,
    email: string,
    fullname: string,
    phone: string
    address: string
}): Promise<OwnersResponse>  {
    return await get<OwnersResponse>(`/communities/${communityId}/members?username=${params.username}&fullName=${params.fullname}&phone=${params.phone}&address=${params.address}&email=${params.email}`);
}