import { treaty } from "@elysiajs/eden";
import { beforeAll, describe, expect, it } from "bun:test";
import { app } from "..";


const api = treaty(app)

describe('Album Like Endpoint', () => {
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

    // it('should success like album', async () => {
    //     const { data, error, status } = await api["album-like"].post(
    //         {
    //             albumId: 'album-Ec95S40dfu3XWKDA'
    //         },
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         }
    //     )
    //     expect(status).toBe(204)
    //     expect(error).toBeNull()
    // })

    it('should unlike or delete like album', async () => {
        const { data, error, status } = await api["album-like"].delete(
            {
                albumId: 'album-Ec95S40dfu3XWKDA'
            },
            {
                headers: {
                    cookie: `accessToken=${token}`
                }
            }
        )
        expect(status).toBe(204)
        expect(error).toBeNull()
    })
})