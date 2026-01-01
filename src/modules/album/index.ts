import Elysia, { status, t } from "elysia";
import { Album } from "./service";
import { AlbumModel } from "./model";

export const album = new Elysia({ prefix: '/albums' })
    .post(
        '/create',
        async ({ body }) => {
            const response = await Album.addAlbum(body)
            return {
                message: 'Berhasil menambahkan album',
                id: response
            }
        }, {
        body: AlbumModel.AlbumPayload,
        response: {
            200: AlbumModel.AlbumResponsePost,
            400: AlbumModel.AlbumInvalidPost
        }
    }
    )
    .get(
        '/',
        async () => {
            const response = await Album.getAlbum()
            return response
        }, {
        response: {
            200: AlbumModel.AlbumResponse,
            400: AlbumModel.AlbumInvalid
        }
    }
    )
    .get(
        '/:albumId',
        async ({ params }) => {
            const { albumId } = params

            const response = await Album.getAlbumById(albumId)
            return response
        }, {
        response: {
            200: AlbumModel.AlbumResponseById,
            404: t.Literal('Album tidak ada')
        }
    }
    )
    .put(
        '/edit/:albumId',
        async ({ params, body }) => {
            const { albumId } = params
            const albumExist = await Album.getAlbumById(albumId)
  
            const response = await Album.putAlbumById(albumId, body)
            return {
                message: 'Berhasil edit album',
                id: response
            }
        }, {
        body: AlbumModel.AlbumPayloadById,
        response: {
            200: AlbumModel.AlbumResponsePost,
            404: t.Literal('Album tidak ada')
        }
    }
    )