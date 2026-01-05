import Elysia, { status } from "elysia";
import { Song } from "./service";
import { SongModel } from "./model";
import { SongError } from "../../errors/songError";
import { authGuard } from "../../utils/authGuard";

export const song = new Elysia({ prefix: '/song' })
    .error({ SONG_ERROR: SongError })
    .onError(({ code, error, set }) => {
        if (code === 'SONG_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .get(
        '/',
        async () => {
            const response = await Song.getAllSongs()
            return status(200, {
                message: 'Berhasil mengambil data',
                data: response
            })
        }, {
        response: {
            200: SongModel.SuccessResponse,
            400: SongModel.ErrorResponse
        }
    }
    )
    .get(
        '/:songId',
        async ({ params }) => {
            const { songId } = params
            const response = await Song.getSongById(songId)
            return status(200, {
                message: `Berhasil mengambil lagu dengan id ${songId}`,
                data: response
            })
        }, {
        response: {
            200: SongModel.SuccessResponseById,
            404: SongModel.ErrorResponse
        }
    }
    )
    .use(authGuard)
    .post(
        '/create',
        async ({ body }) => {
            const response = await Song.addSong(body)
            return status(201, {
                message: 'Berhasil menambahkan song',
                id: response
            })
        }, {
        body: SongModel.SongPayload,
        response: {
            201: SongModel.SuccessResponsePost,
            400: SongModel.ErrorResponse
        }
    }
    )
    .patch(
        '/:songId',
        async ({ params, body }) => {
            const { songId } = params
            const response = await Song.editSongById(songId, body)
            return status(200, {
                message: 'Berhasil memperbarui lagu',
                id: response
            })
        }, {
        body: SongModel.SongPayload,
        response: {
            200: SongModel.SuccessResponsePost,
            400: SongModel.ErrorResponse,
            404: SongModel.ErrorResponse,
        }
    }
    )
    .delete(
        '/:songId',
        async ({ params }) => {
            const { songId } = params
            const response = await Song.deleteSongById(songId)
            return status(204)
        }, {
        response: {
            404: SongModel.ErrorResponse,
        }
    }
    )
