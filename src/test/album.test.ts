import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { app } from '../index'

const api = treaty(app)

describe('Album Endpoints', () => {

    it('should fail to create album with invalid payload', async () => {
        const { error, status } = await api.albums.create.post({
            name: '',
            year: 200,
        })

        expect(status).toBe(422)
    })

    it('should create album successfully', async () => {
        const { data, error, status } = await api.albums.create.post({
            name: 'Nurture',
            year: 2021,
        })

        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })


    it('should get all albums successfully', async () => {
        const { data, error, status } = await api.albums.get()

        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(Array.isArray(data)).toBe(true)
    })

    it('should get album by id successfully', async () => {
        const { data, error, status } = await api.albums({ albumId: 'album-MkDm9i5OXcGQ8Z3t' }).get()

        expect(status).toBe(200)
        expect(error).toBeNull()
    })

    it('should fail get album by id', async () => {
        const { data, error, status } = await api.albums({ albumId: 'album-1' }).get()

        expect(status).toBe(404)
    })

    it('should success update with valid payload', async () => {
        const { error, status } = await api.albums({ albumId: 'album-MkDm9i5OXcGQ8Z3t' }).put({
            name: '',
            year: 2024,
        })

        expect(status).toBe(200)
    })

    it('should fail update with invalid payload', async () => {
        const { error, status } = await api.albums({ albumId: 'album-MkDm9i5OXcGQ8Z3t' }).put({
            name: '',
            year: 2024,
        })

        expect(status).toBe(422)
    })

    it('should fail update with invalid params albumId', async () => {
        const { error, status } = await api.albums({ albumId: 'album-1' }).put({
            name: 'koamng',
            year: 2024,
        })

        expect(status).toBe(404)
    })

    it('should fail delete with invalid params albumId', async () => {
        const { error, status } = await api.albums({ albumId: 'album-1' }).delete()

        expect(status).toBe(404)
    })

    it('should delete album successfully', async () => {
        const { data, error, status } = await api.albums({ albumId: 'album-MkDm9i5OXcGQ8Z3t' }).delete()

        expect(status).toBe(200)
        expect(error).toBeNull()
    })
})