import Elysia, { status, t } from "elysia";
import { Album } from "./service";
import { AlbumModel } from "./model";
import { AlbumError } from "../../errors/albumError";

export const album = new Elysia({ prefix: '/albums' })
    .error({ ALBUM_ERROR: AlbumError })
    .onError(({ code, error, set }) => {
        if (code === 'ALBUM_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
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
            201: AlbumModel.AlbumResponsePost,
            400: AlbumModel.ErrorResponse
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
            400: AlbumModel.ErrorResponse
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
            404: AlbumModel.ErrorResponse
        }
    }
    )
    .put(
        '/:albumId',
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
            404: AlbumModel.ErrorResponse
        }
    }
    )
    .delete(
        '/:albumId',
        async ({ params }) => {
            const { albumId } = params
            await Album.deleteAlbumById(albumId)
            return {
                message: 'Berhasil menghapus album'
            }
        }, {
        response: {
            204: t.Literal('Berhasil menghapus album'),
            404: AlbumModel.ErrorResponse
        }
    }
    )