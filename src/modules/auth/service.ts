import { status } from "elysia"
import { pool } from "../../utils/db"
import { AuthModel } from "./model"
import { AuthError } from "../../errors/authError"

export abstract class Authentication {
    static async addRefreshToken(token: string) {
        const tokenQuery = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token]
        }
        const result = await pool.query(tokenQuery)
        if (!result) {
            throw new AuthError('Gagal menambahkan token', 400)
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
            throw new AuthError('Token tidak valid', 400)
        }
    }
    static async deleteRefreshToken(token: string) {
        await this.verifyRefreshToken(token)
        const tokenQuery = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token]
        }
        await pool.query(tokenQuery);
    }

}