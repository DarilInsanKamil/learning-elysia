import { nanoid } from "nanoid";
import { AlbumModel } from "./model";
import { pool } from "../../db";
import { AlbumError } from "../../errors/albumError";

export abstract class Album {
    static async addAlbum({ name, year }: AlbumModel.AlbumPayload) {
        const id = `album-${nanoid(16)}`
        const createdAt = new Date()

        const albumQuery = {
            text: 'insert into albums (id, name, year, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, name, year, createdAt.toISOString(), createdAt.toISOString()]
        }

        const result = await pool.query(albumQuery)

        if (!result.rows.length) {
            throw new AlbumError('Gagal menambahkan album', 400)
        }
        return result.rows[0].id
    }
    static async getAlbum() {
        const albumQuery = {
            text: 'select * from albums',
        }

        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw new AlbumError('Belum ada album', 400)
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
            throw new AlbumError('Album tidak ada, id tidak ditemukan', 404)
        }
        return result.rows[0]
    }

    static async putAlbumById(id: string, { name, year }: AlbumModel.AlbumPayloadById) {
        await this.getAlbumById(id)

        const updated_at = new Date().toISOString()
        const albumQuery = {
            text: 'update albums set name = $1, year = $2, cover = $3, updated_at = $4 where id = $5 RETURNING id',
            values: [name, year, updated_at, id]
        }

        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw new AlbumError('Gagal memperbarui album', 400)
        }
        return result.rows[0].id
    }
    static async deleteAlbumById(albumId: string) {
        await this.getAlbumById(albumId)
        const albumQuery = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [albumId]
        }
        const result = await pool.query(albumQuery)
        if (!result.rows.length) {
            throw new AlbumError('Gagal menghapus album', 400)
        }
    }

    static async updateAlbumCover(albumId: string, cover: File) {
        const fileName = `${albumId}-${Date.now()}.${cover.type.split('/')[1]}`
        const path = `public/covers/${fileName}`

        await Bun.write(path, cover)

        const coverUrl = `/public/covers/${fileName}`
        const albumQuery = {
            text: 'UPDATE albums SET cover = $1 WHERE id = $2',
            values: [coverUrl, albumId]
        }
        await pool.query(albumQuery)

        return coverUrl
    }
}