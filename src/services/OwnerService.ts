import {Community, OwnerId, OwnerProfile} from "../components/Types";
import {OwnerProfileResponse} from "./Responses";
import {get} from "./Api";

export async function getOwnerProfile(ownerId: OwnerId): Promise<OwnerProfile> {
    const ownerProfile: OwnerProfileResponse = await get<OwnerProfileResponse>(`/owner/${ownerId.id}`)

    return {
        id: {id: ownerProfile.id},
        username: ownerProfile.username,
        email: ownerProfile.email,
        phoneNumber: ownerProfile.phoneNumber,
        address: ownerProfile.address,
        communities: ownerProfile.communities.map((c) => {
            return {
                id: {id: c.communityId},
                name: {value: c.name},
            } as Community
        })
    } as OwnerProfile;
}
