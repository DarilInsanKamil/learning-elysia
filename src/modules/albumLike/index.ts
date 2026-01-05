import { Elysia, status, t } from "elysia";
import { authGuard } from "../../utils/authGuard";
import { AlbumLike } from "./service";
import { AlbumLikeModel } from "./model";
import { AlbumLikeError } from "../../errors/albumLikeError";

export const albumLike = new Elysia({ prefix: '/album-like' })
    .error({ ALBUM_LIKE_MODEL: AlbumLikeError })
    .onError(({ code, error, set }) => {
        if (code === 'ALBUM_LIKE_MODEL') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .use(authGuard)
    .post(
        '/',
        async ({ auth, body }) => {
            const userId = auth.userId
            const { albumId } = body
            await AlbumLike.likeAlbum(userId, albumId)
            return status(204)

        }, {
        body: t.Object({
            albumId: t.String({ minLength: 1 })
        }),
        response: {
            400: AlbumLikeModel.ErrorResponse
        }
    }
    )
    .delete(
        '/',
        async ({ auth, body }) => {
            const userId = auth.userId
            const { albumId } = body
            await AlbumLike.UnlikeAlbum(userId, albumId)
            return status(204)

        }, {
        body: t.Object({
            albumId: t.String({ minLength: 1 })
        }),
        response: {
            400: AlbumLikeModel.ErrorResponse
        }
    }
    )