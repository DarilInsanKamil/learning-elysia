import jwt from '@elysiajs/jwt';

export const jwtPlugin = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET || 'your-secret-key',
});