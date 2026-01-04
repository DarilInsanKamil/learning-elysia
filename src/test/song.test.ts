import { treaty } from "@elysiajs/eden";
import { app } from "..";
import { describe, it, expect } from "bun:test";

const api = treaty(app)

describe('Song Endpoint', () => {

    it('should fail to create album with invalid payload', async () => {
        const { error, status } = await api.song.create.post({
            title: '',
            year: 2003,
            genre: '',
            performer: '',
            duration: 120,
            album_id: ''
        })

        expect(status).toBe(422)
    })

    it('should create album successfully', async () => {
        const { data, error, status } = await api.song.create.post({
            title: 'lifelike',
            year: 2021,
            genre: 'porter pop',
            performer: 'porter robinson',
            duration: 120,
            album_id: ''
        })

        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('should success get all song', async () => {
        const { data, error, status } = await api.song.get()

        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('should success get song with valid id', async () => {
        const { data, error, status } = await api.song({ songId: 'song-J-9uEH-wwvmb6TCo' }).get()

        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('should success get song with invalid id', async () => {
        const { data, error, status } = await api.song({ songId: 'song-J' }).get()

        expect(status).toBe(404)
        expect(data).toBeDefined()
    })

    it('should success edit song with valid id', async () => {
        const { data, error, status } = await api.song({ songId: 'song-J-9uEH-wwvmb6TCo' }).patch({
            title: 'Easier to love you',
            year: 2024,
            genre: 'POP',
            performer: 'Porter Robinson',
            duration: 12,
            album_id: '',
        })
        expect(status).toBe(200)
        expect(data).toBeDefined()
    })

    it('should success edit song with invalid id', async () => {
        const { data, error, status } = await api.song({ songId: 'song-J' }).patch({
            title: 'Easier to love you',
            year: 2024,
            genre: 'POP',
            performer: 'Porter Robinson',
            duration: 12,
            album_id: '',
        })
        expect(status).toBe(404)
        expect(data).toBeDefined()
    })

    it('should success delete song with valid id', async () => {
        const { error, status } = await api.song({ songId: 'song-FbVuM3W8pmmRFdNl' }).delete()

        expect(status).toBe(204)
    })

    it('should success delete song with invalid id', async () => {
        const { error, status } = await api.song({ songId: 'song-F' }).delete()

        expect(status).toBe(404)
    })
})