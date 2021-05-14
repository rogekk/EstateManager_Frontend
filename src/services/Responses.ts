export type TopicResponse = {
    id: string,
    subject: string,
    description: string,
    createdBy: string,
    createdAt: string
}

export type TopicsResponse = {
    topics: Array<TopicResponse>
}
