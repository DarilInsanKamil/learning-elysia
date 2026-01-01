import { nanoid } from "nanoid";
import { AlbumModel } from "./model";
import { pool } from "../../db";
import { status } from "elysia";

export abstract class Album {
    static async addAlbum({ name, year, cover }: AlbumModel.AlbumPayload) {
        const id = `album-${nanoid(16)}`
        const createdAt = new Date()

        const albumQuery = {
            text: 'insert into albums (id, name, year, cover, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, name, year, cover, createdAt.toISOString(), createdAt.toISOString()]
        }

        const result = await pool.query(albumQuery)

        if (!result.rows.length) {
            throw status(400, 'Gagal menambahkan album' satisfies AlbumModel.AlbumInvalidPost)
        }
        return result.rows[0].id
    }
    static async getAlbum() {
        const albumQuery = {
            text: 'select * from albums',
        }

        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw status(400, 'Belum ada album' satisfies AlbumModel.AlbumInvalid)
        }
        return result.rows
    }

    static async getAlbumById(albumId: string) {
        const albumQuery = {
            text: 'select * from albums where id = $1',
            values: [albumId]
        }
        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw status(404, 'Album tidak ada')
        }
        return result.rows[0]
    }

    static async putAlbumById(id: string, { name, year, cover }: AlbumModel.AlbumPayloadById) {

        const updated_at = new Date().toISOString()
        const albumQuery = {
            text: 'update albums set name = $1, year = $2, cover = $3, updated_at = $4 where id = $5 RETURNING id',
            values: [name, year, cover, updated_at, id]
        }

        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw status(404, 'Gagal memperbarui album, id album tidak ada')
        }
        return result.rows[0].id
    }
    static async deleteAlbumById(albumId: string) {
        const albumQuery = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [albumId]
        }
        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw status(404, 'Gagal menghapus album, id album tidak ada')
        }
    }
}