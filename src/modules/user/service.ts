import { nanoid } from "nanoid";
import { pool, query } from "../../db";
import { UserModel } from "./model";
import bcrypt from 'bcrypt';
import { status } from "elysia";

export abstract class User {
    static async registerUser({ username, fullname, password }: UserModel.UserPayload) {
        // await verifyUsername(username)

        const id = `user-${nanoid(16)}`
        const hashedPassword = await bcrypt.hash(password, 10)
        const userQuery = {
            text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
            values: [id, username, hashedPassword, fullname]
        }
        const result = await pool.query(userQuery)
        if (!result.rows.length) {
            throw status(400, 'Gagal menambahkan user baru' satisfies UserModel.UserInvalid)
        }
        return result.rows[0];
    }

    static async getUserById(id: string) {
        const userQuery = {
            text: 'SELECT id, username, fullname from users WHERE id = $1',
            values: [id]
        }

        const result = await pool.query(userQuery)
        if (!result.rows.length) {
            throw status(404, 'User Not Found' satisfies UserModel.GetUserByIdInvalid)
        }
        return result.rows[0]
    }

    static async verifyUsername(username: string) {
        const userQuery = {
            text: 'SELECT username from users WHERE username = $1',
            values: [username]
        }
        const result = await pool.query(userQuery);

        if (!result.rows.length) {
            throw status(404, 'Username sudah digunakan')
        }
    }

    static async verifyUserCredential({ username, password }: UserModel.VerifyCredentialUser) {
        const userQuery = {
            text: 'SELECT id, password FROM users WHERE username = $1',
            values: [username]
        }

        const result = await pool.query(userQuery);

        if (!result.rows.length) {
            throw status(401, 'Credential yang anda berikan salah' satisfies UserModel.VerifyCredentialInvalid)
        }

        const { id, password: hashedPassword } = result.rows[0]

        const match = await bcrypt.compare(password, hashedPassword)

        if (!match) {
            throw status(401, 'Credential yang anda berikan salah' satisfies UserModel.VerifyCredentialInvalid)
        }
        return id
    }
}