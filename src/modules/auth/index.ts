import Elysia from "elysia";
import { UserModel } from "../user/model";
import { User } from "../user/service";
import { jwt } from "@elysiajs/jwt";
import { Authentication } from "./service";
import { authGuard } from "../../utils/authGuard";
import { jwtPlugin } from "../../utils/jwtPlugin";

export const auth = new Elysia({ prefix: '/auth' })
    .use(jwtPlugin)
    .post(
        '/sign-in',
        async ({ body, jwt: jwtService, cookie: { accessToken, refreshToken } }) => {
            const id = await User.verifyUserCredential(body)

            const accessJWTToken = await jwtService.sign({
                sub: id,
                exp: '1800s',
            });
            const refreshJWTToken = await jwtService.sign({
                sub: id,
                exp: '1800s',
            });

            await Authentication.addRefreshToken(refreshJWTToken)

            accessToken.set({
                value: accessJWTToken,
                httpOnly: true,
                maxAge: 600,
                path: "/",
            });


            refreshToken.set({
                value: refreshJWTToken,
                httpOnly: true,
                maxAge: 600,
                path: "/",
            });
            return {
                accessToken: accessJWTToken,
                refreshToken: refreshJWTToken,
            };
        }, {
        body: UserModel.VerifyCredentialUser,
        response: {
            200: UserModel.VerifyCredentialResponse,
            400: UserModel.VerifyCredentialInvalid
        }
    }
    )
    .post(
        '/refresh',
        async ({ cookie: { accessToken, refreshToken }, jwt, set }) => {
            if (!refreshToken.value || typeof refreshToken.value !== 'string') {
                set.status = "Unauthorized"
                throw new Error('Refresh token is missing')
            }
            const jwtPayload = await jwt.verify(refreshToken.value)
            if (!jwtPayload) {
                set.status = 'Forbidden';
                throw new Error("Refresh token is invalid")
            }

            const userId = jwtPayload.sub as string;
            await Authentication.verifyRefreshToken(refreshToken.value)

            const user = await User.getUserById(userId)

            if (!user) {
                set.status = 'Forbidden'
                throw new Error('Refresh token is invalid')
            }

            await Authentication.deleteRefreshToken(refreshToken.value)

            const accessJWTToken = await jwt.sign({
                sub: userId,
                exp: '1800s',
            });

            const refreshJWTToken = await jwt.sign({
                sub: userId,
                exp: '1800s',
            });

            await Authentication.addRefreshToken(refreshJWTToken);

            accessToken.set({
                value: accessJWTToken,
                httpOnly: true,
                maxAge: 600,
                path: "/",
            });

            refreshToken.set({
                value: refreshJWTToken,
                httpOnly: true,
                maxAge: 600,
                path: "/",
            });
            return {
                message: 'Access token refreshed successfully',
            };
        }
    )
    .post(
        '/logout',
        async ({ cookie: { accessToken, refreshToken } }) => {
            await Authentication.verifyRefreshToken(refreshToken.value as string)
            await Authentication.deleteRefreshToken(refreshToken.value as string)
            accessToken.remove();
            refreshToken.remove();
            return {
                message: 'Logout successfully'
            }
        }
    )
