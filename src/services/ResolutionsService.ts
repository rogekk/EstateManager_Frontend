import {CommunityId, OwnerId, Resolution, ResolutionId, Resolutions, Vote} from "../components/Types";
import {ResolutionResponse, ResolutionsResponse} from "./Responses";
import {get, post} from "./Api";

export async function getResolutions(communityId: CommunityId): Promise<Resolutions> {
    const resolutionsResponse: ResolutionsResponse = await get<ResolutionsResponse>(`/communities/${communityId.id}/resolutions`)
        .catch((e) => {
            console.log(e);
            return {resolutions: []}
        });

    const resolutions: Resolution[] = resolutionsResponse.resolutions.map(t => {
        return {
            id: {id: t.id},
            subject: t.subject,
            description: t.description,
            createdAt: t.createdAt,
            sharesPro: t.sharesPro,
            sharesAgainst: t.sharesAgainst,
        } as Resolution
    });

    return {resolutions: resolutions};
}

export async function getResolution(communityId: CommunityId, resolutionId: ResolutionId): Promise<Resolution> {
    const resolutionResponse: ResolutionResponse = await get<ResolutionResponse>(`/communities/${communityId.id}/resolutions/${resolutionId.id}`)

    return {
        id: {id: resolutionResponse.id},
        subject: resolutionResponse.subject,
        description: resolutionResponse.description,
        createdAt: resolutionResponse.createdAt,
        sharesPro: resolutionResponse.sharesPro,
        sharesAgainst: resolutionResponse.sharesAgainst,
    } as Resolution;
}

export async function postVote(communityId: CommunityId,
                               resolutionId: ResolutionId,
                               vote: Vote,
): Promise<any> {
    let path = `/communities/${communityId.id}/resolutions/${resolutionId.id}/votes`;
    return await post(path, {
        vote: vote
    });
}
