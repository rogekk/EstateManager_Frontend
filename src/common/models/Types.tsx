export type OwnerId = { id: string }
export type CommunityId = { id: string }
export type CommunityName = { value: string }
export type Community = { id: CommunityId, name: CommunityName }

export type UserProfile = {
    id: OwnerId,
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    communities: Community[]
}

export type TopicId = { id: string }
export type CommentId = { id: string }
export type ResolutionId = { id: string }

export type Comment = {
    id: CommentId,
    content: string,
    createdAt: string,
    createdBy: TopicCreator
}

export type Topic = {
    id: TopicId,
    subject: string,
    description: string,
    createdBy: TopicCreator,
    createdAt: string,
    commentCount: number,
}

export type TopicCreator = {
    id: OwnerId,
    username: string,
    profileImageUrl?: string,
}

export type Topics = { topics: Array<Topic> }

export type Resolutions = { resolutions: Array<Resolution> }

export type Resolution = {
    id: ResolutionId,
    number: string,
    subject: string,
    createdAt: string,
    description: string,
    sharesPro: number,
    sharesAgainst: number,
    result: 'approved' | 'rejected' | 'open_for_voting' | 'canceled'
}

export type Vote = 'pro' | 'against'

export type Comments = { comments: Array<Comment> }
export type Page = 'dashboard' | 'forums' | 'resolutions';