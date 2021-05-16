export type OwnerId = { id: string }
export type CommunityId = { id: string }
export type CommunityName = { value: string }
export type Community = { id: CommunityId, name: CommunityName }

export type OwnerProfile = {
    id: OwnerId,
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    communities: Community[]
}

export type TopicId = { id: string }
export type CommentId = { id: string }

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

// export class Topic {
//     constructor(
//         readonly id: TopicId,
//         readonly subject: string,
//         readonly createdBy: string,
//         readonly createdAt: string
//     ) {
//     }
// }

export type Topics = { topics: Array<Topic> }
export type Comments = { comments: Array<Comment> }
export type Page = 'dashboard' | 'forums' | 'resolutions';