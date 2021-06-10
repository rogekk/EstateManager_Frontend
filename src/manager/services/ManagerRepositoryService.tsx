import {post} from "../../common/network/Api";
import {CommunityId} from "../../common/models/Types";

export type ResolutionCreation = {
    number: string,
    subject: string,
    description: string,
    voteCountingMethod: VoteCountingMethod
}

export type VoteCountingMethod = 'one_owner_one_vote' | 'shares_based'

export async function createResolution(communityId: CommunityId, resolutionCreation: ResolutionCreation): Promise<void>  {
    await post(`/communities/${communityId.id}/resolutions`, resolutionCreation)
}