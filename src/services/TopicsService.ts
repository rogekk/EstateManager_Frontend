import {Comment, Comments, CommunityId, OwnerId, OwnerProfile, Topic, TopicId, Topics} from "../components/Types";
import {get, post} from "./Api";
import {CommentResponse, CommentsResponse, OwnerProfileResponse, TopicsResponse} from "./Responses";

export async function getTopics(communityId: CommunityId): Promise<Topics> {
    const topicsResponse = await get<TopicsResponse>(`/communities/${communityId.id}/topics`)
        .catch((e) => {
            console.log(e);
            return <TopicsResponse>{topics: []}
        });

    const topics: Topic[] = topicsResponse.topics.map(t => <Topic>{
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
    return {
        id: {id: r.id},
        username: r.username,
        email: r.email,
        phoneNumber: r.phoneNumber,
        address: r.address,
        communities: []
    };
}

export async function getComments(
    communityId: CommunityId,
    topicId: TopicId): Promise<Comments> {
    const commentsResponse = await get<CommentsResponse>(`/communities/${communityId.id}/topics/${topicId.id}/comments`)
        .catch((e) => {
            console.log(e);
            return <CommentsResponse>{comments: []}
        });

    const comments: Comment[] = commentsResponse.comments.map(t => <Comment>{
        id: {id: t.id},
        content: t.content,
        createdAt: t.createdAt,
        createdBy: {
            id: {id: t.createdBy.id},
            username: t.createdBy.username,
            profileImageUrl: t.createdBy.profileImageUrl,
        }
    });

    return {comments: comments};
}
