import {get} from "../../common/network/Api";
import {CommunitiesResponse, OwnersResponse} from "../models/responses/Responses";
import {OwnerSearch} from "../components/ManagerCommunity";
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