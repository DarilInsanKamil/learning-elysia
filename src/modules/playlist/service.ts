import { nanoid } from "nanoid"
import { PlaylistModel } from "./model"
import { pool } from "../../utils/db"
import { PlaylistError } from "../../errors/playlistError"
import { User } from "../user/service"

export abstract class Playlist {
    static async addPlaylist(userId: string, { name }: PlaylistModel.PlaylistPayload) {
        const id = `playlist-${nanoid(16)}`
        const date = new Date().toISOString()
        const playlistQuery = {
            text: 'insert into playlists(id, name, owner, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, userId, date, date]
        }
        const result = await pool.query(playlistQuery)
        if (!result.rows.length) {
            throw new PlaylistError('Gagal menambahkan playlist', 400)
        }
        return result.rows[0].id
    }
    static async getAllPlaylist() {
        const playlistQuery = {
            text: 'select * from playlists'
        }
        const result = await pool.query(playlistQuery)

        if (!result.rows.length) {
            throw new PlaylistError('Playlist tidak ada', 400)
        }
        return result.rows
    }
    static async getPlaylistByUserId(userId: string) {
        await User.getUserById(userId)

        const playlistQuery = {
            text: 'select * from playlists where owner = $1',
            values: [userId]
        }

        const result = await pool.query(playlistQuery)
        if (!result.rows.length) {
            throw new PlaylistError('Playlist tidak ada', 400)
        }
        return result.rows[0]
    }
    static async verifyPlaylist(playlistId: string, userId: string) {
        const playlistQuery = {
            text: 'select id from playlists where id = $1 and owner = $2',
            values: [playlistId, userId]
        }
        const result = await pool.query(playlistQuery)
        if (!result.rows.length) {
            throw new PlaylistError('Playlist tidak ada, id playlist tidak ditemukan', 404)
        }
    }
    static async editPlaylistById(playlistId: string, userId: string, { name }: PlaylistModel.PlaylistPayload) {
        await this.verifyPlaylist(playlistId, userId)
        const date = new Date().toISOString()
        const playlistQuery = {
            text: 'update playlists set name = $1, updated_at = $2 where id = $3 and owner = $4 returning id',
            values: [name, date, playlistId, userId]
        }
        const result = await pool.query(playlistQuery)

        if (!result.rows.length) {
            throw new PlaylistError('Gagal memperbarui playlist', 400)
        }
        return result.rows[0].id
    }

    static async deletePlaylistUser(playlistId: string, userId: string) {
        await this.verifyPlaylist(playlistId, userId)

        const playlistQuery = {
            text: 'delete from playlists where id = $1 and owner = $2 returning id',
            values: [playlistId, userId]
        }

        const result = await pool.query(playlistQuery)
        if(!result.rows.length) {
            throw new PlaylistError('Gagal menghapus playlist',400)
        }
    }
}