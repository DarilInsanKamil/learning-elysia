import Elysia, { status } from "elysia";
import { UserModel } from "./model";
import { User } from "./service";
import { authGuard } from "../../utils/authGuard";
import { UserError } from "../../errors/userError";

export const user = new Elysia({ prefix: '/auth' })
    .post(
        '/register',
        async ({ body }) => {
            const response = await User.registerUser(body)
            return response
        },
        {
            body: UserModel.UserPayload,
            response: {
                200: UserModel.RegisterResponse,
                400: UserModel.UserInvalid
            }
        }
    )
    .error({ USER_ERROR: UserError })
    .onError(({ code, error, set }) => {
        if (code === 'USER_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .use(authGuard)
    .get(
        '/me',
        async ({ auth }) => {
            const userId = auth.userId
            const response = await User.getUserById(userId)
            return status(200, {
                response
            })
        }, {
        response: {
            404: UserModel.ErrorResponse
        }
    }
    )