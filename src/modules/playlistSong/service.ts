import { nanoid } from "nanoid";
import { Playlist } from "../playlist/service";
import { pool } from "../../utils/db";
import { PlaylistSongsError } from "../../errors/playlistSongError";

export abstract class PlaylistSongs {
    static async addSongIntoPlaylist(playlistId: string, songId: string, userId: string) {
        await Playlist.verifyPlaylist(playlistId, userId)

        const id = `psong-${nanoid(16)}`
        const psQuery = {
            text: 'insert into playlist_songs (id, playlist_id, song_id) values ($1, $2,$3) returning id',
            values: [id, playlistId, songId]
        }
        const result = await pool.query(psQuery)
        if (!result.rows.length) {
            throw new PlaylistSongsError('Gagal menambahkan lagu ke playlist', 400)
        }
        return result.rows[0].id
    }
    static async deleteSongInPlaylist(playlistId: string, songId: string, userId: string, id: string) {
        await Playlist.verifyPlaylist(playlistId, userId)

        const psQuery = {
            text: 'delete from playlist_songs where id = $1 and playlist_id = $2 returning id',
            values: [id, playlistId]
        }

        const result = await pool.query(psQuery)
        if (!result.rows.length) {
            throw new PlaylistSongsError('Gagal menghapus lagu dari playlist', 400)
        }
    }
    static async getSongInPlaylist(playlistId: string) {
        const psQuery = {
            text: `SELECT s.id, s.title,s.performer, s.duration
            FROM songs s LEFT JOIN playlist_songs ps ON s.id = ps.song_id
            WHERE ps.playlist_id = $1`,
            values: [playlistId]
        }
        const result = await pool.query(psQuery)
        if (!result.rows.length) {
            throw new PlaylistSongsError('Berhasil mengambil lagu dari playlist', 200)
        }
        return result.rows
    }
}