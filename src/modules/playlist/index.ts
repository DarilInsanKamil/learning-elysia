import Elysia, { status, t } from "elysia";
import { Playlist } from "./service";
import { PlaylistModel } from "./model";
import { authGuard } from "../../utils/authGuard";
import { PlaylistError } from "../../errors/playlistError";
import { PlaylistSongs } from "../playlistSong/service";

export const playlist = new Elysia({ prefix: '/playlist' })
    .error({ PLAYLIST_ERROR: PlaylistError })
    .onError(({ code, error, set }) => {
        if (code === 'PLAYLIST_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .get(
        '/',
        async () => {
            const response = await Playlist.getAllPlaylist()
            return status(200, {
                message: 'Berhasil mengambil playlist',
                data: response
            })
        }, {
        response: {
            200: PlaylistModel.SuccessResponse,
            400: PlaylistModel.ErrorResponse
        }
    }
    )
    .get(
        '/:playlistId/songs',
        async ({ params }) => {
            const { playlistId } = params

            const response = await PlaylistSongs.getSongInPlaylist(playlistId)
            return status(200, response)
        }, {
        response: {
            400: PlaylistModel.ErrorResponse
        }
    }
    )
    .use(authGuard)
    .post(
        '/create',
        async ({ body, auth }) => {
            const userId = auth.userId
            const response = await Playlist.addPlaylist(userId, body)
            return status(201, {
                message: 'Berhasil menambahkan playlist',
                id: response
            })
        }, {
        body: PlaylistModel.PlaylistPayload,
        response: {
            201: PlaylistModel.SuccessResponsePost,
            400: PlaylistModel.ErrorResponse
        }
    }
    )
    .get(
        '/user-playlist',
        async ({ auth }) => {
            const userId = auth.userId
            const response = await Playlist.getPlaylistByUserId(userId)
            return status(200, {
                meesage: 'Berhasil mengambil data playlist',
                response
            })
        }
    )
    .patch(
        '/:playlistId',
        async ({ auth, body, params }) => {
            const userId = auth.userId
            const { playlistId } = params
            const response = await Playlist.editPlaylistById(playlistId, userId, body)
            return status(200, {
                message: 'Berhasil memperbarui playlist',
                id: response
            })
        }, {
        body: PlaylistModel.PlaylistPayload,
        response: {
            200: PlaylistModel.SuccessResponsePost,
            404: PlaylistModel.ErrorResponse,
            400: PlaylistModel.ErrorResponse
        }
    }
    )
    .delete(
        '/:playlistId',
        async ({ auth, params }) => {
            const userId = auth.userId
            const { playlistId } = params
            await Playlist.deletePlaylistUser(playlistId, userId)
            return status(200, {
                message: 'Berhasil menghapus playlist'
            })
        }, {
        response: {
            404: PlaylistModel.ErrorResponse
        }
    }
    )
    .post(
        '/:playlistId/songs',
        async ({ params, auth, body }) => {
            const { playlistId } = params
            const userId = auth.userId
            const { songId } = body
            const response = await PlaylistSongs.addSongIntoPlaylist(playlistId, songId, userId)
            return status(201, {
                message: 'Berhasil menambahkan lagu ke playlist',
                id: response
            })
        }, {
        body: t.Object({
            songId: t.String({ minLength: 1 })
        }),
        response: {
            201: PlaylistModel.SuccessResponsePost,
            400: PlaylistModel.ErrorResponse
        }
    }
    )
    .delete(
        '/:playlistId/songs/:id',
        async ({ auth, params, body }) => {
            const { playlistId, id } = params
            const userId = auth.userId
            const { songId } = body
            await PlaylistSongs.deleteSongInPlaylist(playlistId, songId, userId, id)
            return status(200, {
                message: 'Berhasil menghapus lagu dari playlist'
            })
        }, {
        body: t.Object({
            songId: t.String()
        }),
        response: {
            400: PlaylistModel.ErrorResponse
        }
    }
    )
