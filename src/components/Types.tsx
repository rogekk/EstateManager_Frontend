export type Community = {
    id: CommunityId
}

export type CommunityId = {
    id: string
}

export type TopicId = { id: string }

export type Topic = {
    id: TopicId,
    subject: string,
    createdBy: string,
    createdAt: string
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

export type Topics = { topics: Array<Topic>}