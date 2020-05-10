export type MovieDetailDurationModel = {
    hours: number,
    minutes: number,
    seconds: number,
    totalHours: number,
    totalMinutes: number,
    totalSeconds: number,
}

export type MovieDetailModel = {
    name: string,
    description: string,
    duration: MovieDetailDurationModel,
    releaseDate: Date,
    classification: string,
    cover: string
}