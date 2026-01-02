import { describe, expect, it } from 'bun:test'
import { app } from '..'

describe('Album Feature', () => {
    it('should return 404 if album not found', async () => {
        const response = await app.handle(
            new Request('http://localhost/albums/invalid-id')
        )

        expect(response.status).toBe(404)
        const body = await response.json()
        expect(body.success).toBe(false)
    })
})