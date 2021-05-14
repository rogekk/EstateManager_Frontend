export type TopicResponse = {
    id: string,
    subject: string,
    createdBy: string,
    createdAt: string
}

export type TopicsResponse = {
    topics: Array<TopicResponse>
}
