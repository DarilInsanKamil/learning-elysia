import { t } from 'elysia'

export namespace UserModel {


    export const UserPayload = t.Object({
        username: t.String(),
        password: t.String(),
        fullname: t.String(),
    })

    export type UserPayload = typeof UserPayload.static

    export const RegisterResponse = t.Object({
        id: t.String()
    })
    export type RegisterResponse = typeof RegisterResponse.static

    export const GetUserByIdResponse = t.Object({
        username: t.String(),
        fullname: t.String()
    })
    export type GetUserByIdResponse = typeof GetUserByIdResponse.static

    export const GetUserById = t.Object({
        id: t.String()
    })

    export type GetUserById = typeof GetUserById.static


    export const VerifyUsername = t.Object({
        username: t.String()
    })
    export type VerifyUsername = typeof VerifyUsername.static

    export const VerifyCredentialUser = t.Object({
        username: t.String(),
        password: t.String(),
    })

    export type VerifyCredentialUser = typeof VerifyCredentialUser.static

    export const VerifyCredentialResponse = t.Object({
        accessToken: t.String(),
        refreshToken: t.String(),
    })

    export type VerifyCredentialResponse = typeof VerifyCredentialResponse.static
    export const VerifyCredentialInvalid = t.Literal('Credential yang anda berikan salah')
    export const UserInvalid = t.Literal('Gagal menambahkan user baru')
    export const GetUserByIdInvalid = t.Literal('User Not Found')
    export type UserInvalid = typeof UserInvalid.static
    export type VerifyCredentialInvalid = typeof VerifyCredentialInvalid.static
    export type GetUserByIdInvalid = typeof GetUserByIdInvalid.static
}