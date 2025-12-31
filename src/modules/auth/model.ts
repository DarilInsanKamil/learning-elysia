import { t } from 'elysia'

export namespace AuthModel {

    export const AuthToken = t.Object({
        token: t.String()
    })

    export type AuthToken = typeof AuthToken.static


    export const AuthTokenInvalid = t.Literal('Gagal menambahkan token')
    export type AuthTokenInvalid = typeof AuthTokenInvalid.static
}
