export type MoviFavoriteType = {
    id: number,
    name: string,
    cover: string,
}

export type FavoriteType = {
    id: number,
    movie: MoviFavoriteType
}