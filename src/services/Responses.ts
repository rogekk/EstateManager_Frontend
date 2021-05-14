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

export type OwnerProfileResponse = {
    id: string,
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    communities: CommunityResponse[]
}

export type CommunityResponse = { id: string, name: string }
