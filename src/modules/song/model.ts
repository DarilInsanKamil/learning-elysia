import { t } from 'elysia'

export namespace SongModel {
    export const SongPayload = t.Object({
        title: t.String({ minLength: 1 }),
        year: t.Number(),
        genre: t.String({ minLength: 1 }),
        performer: t.String({ minLength: 1 }),
        duration: t.Number(),
        album_id: t.Nullable(t.String()),
    })

    export type SongPayload = typeof SongPayload.static

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static

    export const SuccessResponsePost = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String()
    })
    export type SuccessResponsePost = typeof SuccessResponsePost.static


    export const SuccessResponse = t.Object({
        message: t.String({ minLength: 1 }),
        data: t.Array(
            t.Object({
                id: t.String(),
                title: t.String(),
                year: t.Number(),
                genre: t.String(),
                performer: t.String(),
                duration: t.Number(),
                album_id: t.Nullable(t.String()),
                created_at: t.String(),
                updated_at: t.String()
            })
        )
    })
    export type SuccessResponse = typeof SuccessResponse.static

    export const SuccessResponseById = t.Object({
        message: t.String({ minLength: 1 }),
        data: t.Object({
            id: t.String(),
            title: t.String(),
            year: t.Number(),
            genre: t.String(),
            performer: t.String(),
            duration: t.Number(),
            album_id: t.Nullable(t.String()),
            created_at: t.String(),
            updated_at: t.String()
        })

    })
    export type SuccessResponseById = typeof SuccessResponseById.static

}