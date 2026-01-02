import { Elysia } from 'elysia';
import { jwtPlugin } from './jwtPlugin';

export const authGuard = new Elysia()
    .use(jwtPlugin)
    .derive(async ({ cookie, jwt, set }) => {
        const token = cookie.accessToken?.value;

        if (!token) {
            set.status = 401;
            throw new Error('Unauthorized');
        }

        const payload = await jwt.verify(token as string);

        if (!payload || !payload.sub) {
            set.status = 401;
            throw new Error('Invalid access token');
        }

        return {
            auth: {
                userId: payload.sub,
            },
        };
    })
    .as('scoped')
