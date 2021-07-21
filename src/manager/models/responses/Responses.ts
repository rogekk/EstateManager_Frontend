export type IssuesResponse = {
    issues: IssueResponse[]
}

type CreatedBy = {
    id: string,
    username: string,
    profileImageUrl: string
};

export type IssueResponse = {
    id: string,
    subject: string,
    communityId: string,
    description: string,
    attachments: string,
    createdAt: any,
    createdBy: CreatedBy,
    status: 'new' | 'received' | 'in_progress' | 'closed' | 're_opened',
    commentCount: 0
}

export type CommunitiesResponse = {
    communities: CommunityResponse[]
}

export type CommunityResponse = {
    id: string,
    name: string
}

export type OwnersResponse = {
  users: OwnerResponse[]
}
export type OwnerResponse = {
    id: string,
    username: string,
    email: string,
    fullName: string
    phoneNumber: string,
    address: string
}
