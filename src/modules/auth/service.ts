import { status } from "elysia"
import { pool } from "../../db"
import { AuthModel } from "./model"

export abstract class Authentication {
    static async addRefreshToken(token: string) {
        const tokenQuery = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token]
        }
        const result = await pool.query(tokenQuery)
        if (!result) {
            throw status(400, 'Gagal menambahkan token' satisfies AuthModel.AuthTokenInvalid)
        }
        return result
    }

    static async verifyRefreshToken(token: string) {
        const tokenQuery = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token]
        }

        const result = await pool.query(tokenQuery)
        if (!result.rows.length) {
            throw status(400, 'Refresh token tidak valid')
        }
    }
    static async deleteRefreshToken(token: string) {
        const tokenQuery = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token]
        }
        await pool.query(tokenQuery);
    }

}