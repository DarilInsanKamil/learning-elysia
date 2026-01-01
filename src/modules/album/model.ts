import { t } from 'elysia'

export namespace AlbumModel {
    export const AlbumPayload = t.Object({
        name: t.String(),
        year: t.Number(),
        cover: t.String()
    })

    export type AlbumPayload = typeof AlbumPayload.static
  
    export const AlbumPayloadById = t.Object({
        name: t.String(),
        year: t.Number(),
        cover: t.String()
    })

    export type AlbumPayloadById = typeof AlbumPayloadById.static

    export const AlbumResponsePost = t.Object({
        message: t.String(),
        id: t.String(),
    })

    export type AlbumResponsePost = typeof AlbumResponsePost.static

    export const AlbumResponse = t.Array(
        t.Object({
            id: t.String(),
            name: t.String(),
            year: t.Number(),
            cover: t.String(),
            created_at: t.String(),
            updated_at: t.String()
        })
    )

    export type AlbumResponse = typeof AlbumResponse.static
    export const AlbumResponseById = t.Object({
        id: t.String(),
        name: t.String(),
        year: t.Number(),
        cover: t.String(),
        created_at: t.String(),
        updated_at: t.String()
    })


    export type AlbumResponseById = typeof AlbumResponseById.static

    export const AlbumInvalidPost = t.Literal('Gagal menambahkan album')
    export type AlbumInvalidPost = typeof AlbumInvalidPost.static
    export const AlbumInvalid = t.Literal('Belum ada album')
    export type AlbumInvalid = typeof AlbumInvalid.static
}