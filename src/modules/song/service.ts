import { nanoid } from "nanoid";
import { SongModel } from "./model";
import { pool } from "../../db";
import { SongError } from "../../errors/songError";

export abstract class Song {
    static async addSong({ title, year, genre, performer, duration }: SongModel.SongPayload) {
        const id = `song-${nanoid(16)}`
        const date = new Date().toISOString()
        const songQuery = {
            text: 'insert into songs (id, title, year, genre, performer, duration, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7, $8) returning id',
            values: [id, title, year, genre, performer, duration, date, date]
        }
        const result = await pool.query(songQuery)

        if (!result.rows.length) {
            throw new SongError('Gagal menambahkan lagu', 400)
        }
        return result.rows[0].id
    }
    static async getAllSongs() {
        const songQuery = {
            text: 'select * from songs',
        }
        const result = await pool.query(songQuery)
        if (!result.rows.length) {
            throw new SongError('Gagal menambahkan lagu', 400)
        }
        return result.rows
    }

    static async getSongById(songId: string) {
        const songQuery = {
            text: 'select * from songs where id = $1',
            values: [songId]
        }
        const result = await pool.query(songQuery)
        if (!result.rows.length) {
            throw new SongError('Lagu tidak ada, id lagu tidak ditemukan', 404)
        }
        return result.rows[0]
    }

    static async editSongById(songId: string, { title, year, genre, performer, duration }: SongModel.SongPayload) {
        await this.getSongById(songId)

        const date = new Date().toISOString()

        const songQuery = {
            text: 'update songs set title = $1, year = $2, genre = $3, performer = $4, duration = $5, updated_at = $6 returning id',
            values: [title, year, genre, performer, duration, date]
        }
        const result = await pool.query(songQuery)
        if (!result.rows.length) {
            throw new SongError('Gagal memperbarui lagu', 400)
        }
        return result.rows[0].id
    }

    static async deleteSongById(songId: string) {
        await this.getSongById(songId)

        const songQuery = {
            text: 'delete from songs where id = $1 returning id',
            values: [songId]
        }
        const result = await pool.query(songQuery)
        if (!result.rows.length) {
            throw new SongError('Gagal menghapus lagu', 400)
        }
    }
}