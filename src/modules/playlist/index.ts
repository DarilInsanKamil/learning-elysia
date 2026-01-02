import Elysia, { status } from "elysia";
import { Playlist } from "./service";
import { PlaylistModel } from "./model";
import { authGuard } from "../../utils/authGuard";
import { PlaylistError } from "../../errors/playlistError";

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
