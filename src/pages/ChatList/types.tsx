export type UserChatType = {
    id: number,
    name: string,
    picture: string
}

export type ChatType = {
    id: number,
    user: UserChatType
}