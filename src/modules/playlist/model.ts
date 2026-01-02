import { t } from 'elysia'

export namespace PlaylistModel {
    export const PlaylistPayload = t.Object({
        name: t.String({ minLength: 1 }),
    })
    export type PlaylistPayload = typeof PlaylistPayload.static

    export const SuccessResponsePost = t.Object({
        message: t.String(),
        id: t.String()
    })
    export type SuccessResponsePost = typeof SuccessResponsePost.static

    export const SuccessResponse = t.Object({
        message: t.String(),
        data: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            owner: t.String(),
            created_at: t.String(),
            updated_at: t.String()
        }))
    })
    export type SuccessResponse = typeof SuccessResponse.static

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}