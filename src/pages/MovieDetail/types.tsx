export type MovieDetailDurationModel = {
    hours: number,
    minutes: number,
    seconds: number,
    totalHours: number,
    totalMinutes: number,
    totalSeconds: number,
}

export type MovieActorModel = {
    id: number,
    name: string,
    picture: string,
    type: string
}

export type MovieDetailModel = {
    id: number,
    name: string,
    description: string,
    duration: MovieDetailDurationModel,
    releaseDate: Date,
    classification: string,
    cover: string,
    isFavorite: boolean,
    actors: MovieActorModel[]
}