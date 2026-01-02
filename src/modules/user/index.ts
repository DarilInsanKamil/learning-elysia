import Elysia, { status } from "elysia";
import { UserModel } from "./model";
import { User } from "./service";
import { authGuard } from "../../utils/authGuard";
import { UserError } from "../../errors/userError";

export const user = new Elysia({ prefix: '/auth' })
    .use(authGuard)
    // .post(
    //     '/register',
    //     async ({ body }) => {
    //         const response = await User.registerUser(body)
    //         return response
    //     },
    //     {
    //         body: UserModel.UserPayload,
    //         response: {
    //             200: UserModel.RegisterResponse,
    //             400: UserModel.UserInvalid
    //         }
    //     }
    // )
    .error({ USER_ERROR: UserError })
    .onError(({ code, error, set }) => {
        if (code === 'USER_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .get(
        '/user/:id',
        async ({ params: id }) => {
            const response = await User.getUserById(id.id)
            return response
        }, {
        params: UserModel.GetUserById,
        response: {
            200: UserModel.GetUserByIdResponse,
            404: UserModel.ErrorResponse
        }
    }
    )