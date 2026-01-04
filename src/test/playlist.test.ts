import { treaty } from "@elysiajs/eden";
import { app } from "..";
import { beforeAll, describe, expect, it } from "bun:test";

const api = treaty(app)

describe('', () => {
    let token = ''

    beforeAll(async () => {
        const { data, error } = await api.auth['sign-in'].post({
            username: 'insank',
            password: '2132daril'
        })

        if (!error && data?.accessToken) {
            token = data.accessToken
        }
    })

    // it('should create playlist successfully', async () => {

    //     const { data, error, status } = await api.playlist.create.post(
    //         { name: '2025 Wrapped' },
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )

    //     expect(status).toBe(201)
    //     expect(error).toBeNull()
    //     expect(data).toBeDefined()
    // })
    // it('should return all playlist', async () => {
    //     const { data, error, status } = await api.playlist.get()

    //     expect(status).toBe(200)
    //     expect(error).toBeNull()
    //     expect(data).toBeDefined()
    // })
    // it('should return playlist user', async () => {
    //     const { data, error, status } = await api.playlist["user-playlist"].get(
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(200)
    // })

    // it('should success update playlist user', async () => {
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-bIcU4DqW4F3VCoGw' }).patch(
    //         {
    //             name: 'hello world2'
    //         },
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(200)
    //     expect(error).toBeNull()
    //     expect(data).toBeDefined()
    // })

    // it('should fail update playlist with invalid playlist id', async () => {
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-W4F3VCoGw' }).patch(
    //         {
    //             name: 'hello world2'
    //         },
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(404)
    //     expect(data).toBeDefined()
    // })
    // it('should success delete playlist user valid playlist id', async () => {
    //     console.log(token)
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-bIcU4DqW4F3VCoGw' }).delete(
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(204)
    // })

    // it('should fail delete playlist user with invalid playlist id', async () => {
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-W4F3VCoGw' }).delete(
    //         undefined,
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )

    //     expect(status).toBe(404)
    // })

    // it('should success delete playlist user with valid playlist', async () => {
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-aDUdvF2B4AObE8Ix' }).delete(
    //         undefined,
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(200)
    // })

    it('should success add song into playlist', async () => {
        const { data, error, status } = await api.playlist({ playlistId: 'playlist-aDUdvF2B4AObE8Ix' }).songs.post(
            {
                songId: 'song-fYbhVSiKZuRBpFfY'
            },
            {
                headers: {
                    cookie: `accessToken=${token}`
                }
            }
        )
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    // it('should success delete song from playlist', async () => {
    //     const { data, error, status } = await api.playlist({ playlistId: 'playlist-aDUdvF2B4AObE8Ix' }).songs({ id: 'psong-KQL1HGC80uoZ-kkN' }).delete(
    //         {
    //             songId: 'song-fYbhVSiKZuRBpFfY'
    //         },
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(200)
    //     expect(error).toBeNull()
    // })

})