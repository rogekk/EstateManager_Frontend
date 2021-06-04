export type IssuesResponse = {
    issues: IssueResponse[]
}

export type IssueResponse = {
    id: string,
    subject: string,
    description: string,
    attachments: string,
    createdAt: string,
    createdBy: {
        id: string,
        username: string,
        profileImageUrl: string
    },
    status: 'new' | 'received' | 'in_progress' | 'closed' | 're_opened',
    commentCount: 0
}
