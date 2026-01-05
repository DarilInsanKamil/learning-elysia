import { t } from 'elysia'

export namespace AlbumLikeModel {
    export const AlbumLikePayload = t.Object({
        userId: t.String({ minLength: 1 }),
        albumId: t.String({ minLength: 1 })
    })

    export type AlbumLikePayload = typeof AlbumLikePayload.static
    
    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}