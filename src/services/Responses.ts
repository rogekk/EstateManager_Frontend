export type TopicResponse = {
    id: string,
    subject: string,
    description: string,
    createdBy: TopicCreatorResponse,
    createdAt: string,
    commentCount: number
}

export type TopicCreatorResponse = {
    id: string,
    username: string,
    profileImageUrl?: string
}

export type TopicsResponse = {
    topics: Array<TopicResponse>
}

export type CommentsResponse = {
    comments: Array<CommentResponse>
}

export type CommentResponse = {
    id: string,
    content: string,
    createdBy: CommentCreatorResponse,
    createdAt: string
}

export type CommentCreatorResponse = {
    id: string,
    username: string,
    profileImageUrl?: string
}

export type ResolutionsResponse = {
    resolutions: Array<ResolutionResponse>
}

export type ResolutionResponse = {
      id: string,
      number: string,
      subject: string,
      createdAt: string,
      description: string
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
