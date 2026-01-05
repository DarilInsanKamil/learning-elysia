import { nanoid } from "nanoid";
import { Album } from "../album/service";
import { pool } from "../../utils/db";
import { AlbumLikeModel } from "./model";
import { AlbumLikeError } from "../../errors/albumLikeError";

export abstract class AlbumLike {
    static async likeAlbum(userId: string, albumId: string) {
        await Album.getAlbumById(albumId)
        const id = `ual-${nanoid(16)}`
        const albumLikeQuery = {
            text: 'insert into user_album_like (id, user_id, album_id) values ($1, $2, $3) returning id',
            values: [id, userId, albumId]
        }
        const result = await pool.query(albumLikeQuery)
        if (!result.rows.length) {
            throw new AlbumLikeError('Gagal like album', 400)
        }
    }
    static async UnlikeAlbum(userId: string, albumId: string) {
        await Album.getAlbumById(albumId)
        const albumLikeQuery = {
            text: 'delete from user_album_like where user_id = $1, album_id = $2 returning id',
            values: [userId, albumId]
        }
        const result = await pool.query(albumLikeQuery)
        if (!result.rows.length) {
            throw new AlbumLikeError('Gagal like album', 400)
        }
    }
}