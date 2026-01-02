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
}