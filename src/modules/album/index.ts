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
            return status(201, {
                message: "Berhasil menambahkan album",
                id: response
            })
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
            return status(200, response)
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
            return status(200, response)
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
                status: 200,
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
            return status(200, {
                message: 'Berhasil menghapus album'
            })
        }, {
        response: {
            200: AlbumModel.AlbumResponseDelete,
            404: AlbumModel.ErrorResponse
        }
    }
    )
    .patch('/:albumId/cover', async ({ params: { albumId }, body: { cover }, status }) => {
        const url = await Album.updateAlbumCover(albumId, cover)
        return status(200, { coverUrl: url, message: 'Cover berhasil diperbarui' })
    }, {
        body: AlbumModel.UploadCover
    })