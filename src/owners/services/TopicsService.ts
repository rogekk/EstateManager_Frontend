import {
    Comment,
    Comments,
    CommunityId,
    OwnerId,
    OwnerProfile,
    Topic,
    TopicId,
    Topics
} from "../../common/models/Types";
import {CommentsResponse, OwnerProfileResponse, TopicsResponse} from "./Responses";
import {get, post} from "../../common/network/Api";

export async function getTopics(communityId: CommunityId): Promise<Topics> {
    const topicsResponse: TopicsResponse = await get<TopicsResponse>(`/communities/${communityId.id}/topics`)
        .catch((e) => {
            console.log(e);
            return {topics: []}
        });

    const topics: Topic[] = topicsResponse.topics.map(t => {
        return {
            id: {id: t.id},
            subject: t.subject,
            description: t.description,
            createdAt: t.createdAt,
            createdBy: {
                id: {id: t.createdBy.id},
                username: t.createdBy.username,
                profileImageUrl: t.createdBy.profileImageUrl,
            },
            commentCount: t.commentCount,
        }
    });

    return {topics: topics};
}

export async function postComment(communityId: CommunityId,
                                  topicId: TopicId,
                                  content: string,
): Promise<any> {
    let path = `/communities/${communityId.id}/topics/${topicId.id}/comments`;
    console.log(path);
    return await post(path, {
        content: content
    });
}

export async function postTopic(communityId: CommunityId,
                                subject: string,
                                description: string): Promise<any> {
    return await post(`/communities/${communityId.id}/topics`, {
        subject: subject,
        communityId: communityId.id,
        description: description
    });
}

export async function getProfile(ownerId: OwnerId): Promise<OwnerProfile> {
    const r = await get<OwnerProfileResponse>(`/owners/${ownerId.id}`);

    console.log(r);
    return {
        id: {id: r.id},
        username: r.username,
        email: r.email,
        phoneNumber: r.phoneNumber,
        address: r.address,
        communities:
            r.communities.map(c => {
                return {
                    id: {id: c.communityId},
                    name: {value: c.name}
                }
            })

    };
}

export async function getComments(
    communityId: CommunityId,
    topicId: TopicId): Promise<Comments> {
    const commentsResponse: CommentsResponse = await get<CommentsResponse>(`/communities/${communityId.id}/topics/${topicId.id}/comments`)
        .catch((e) => {
            console.log(e);
            return {comments: []}
        });

    const comments: Comment[] = commentsResponse.comments.map(t => {
        return {
            id: {id: t.id},
            content: t.content,
            createdAt: t.createdAt,
            createdBy: {
                id: {id: t.createdBy.id},
                username: t.createdBy.username,
                profileImageUrl: t.createdBy.profileImageUrl,
            }
        }
    });

    return {comments: comments};
}
