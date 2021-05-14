import {CommunityId, Topic, Topics, TopicId, Community} from "../components/Types";
import {get, post} from "./Api";
import {TopicsResponse} from "./Responses";

export async function getTopics(communityId: CommunityId): Promise<Topics> {
    const topicsResponse = await get<TopicsResponse>(`/communities/${communityId.id}/topics`)
        .catch((e) => {console.log(e); return <TopicsResponse> {topics: []}});

    const topics: Topic[] = topicsResponse.topics.map(t => <Topic>{
        id: {id: t.id},
        subject: t.subject,
        description: t.description,
        createdAt: t.createdAt,
        createdBy: t.createdBy
    });

    return {topics: topics};
}
export async function postTopic(communityId: CommunityId,
                                subject: string,
                                description: string): Promise<any>{
    const result = await post(`/communities/${communityId.id}/topics`, {
        subject: subject,
        communityId: communityId.id,
        description: description
    });
    return result
}
