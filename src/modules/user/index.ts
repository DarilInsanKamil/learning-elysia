import Elysia, { status } from "elysia";
import { UserModel } from "./model";
import { User } from "./service";
import { authGuard } from "../../utils/authGuard";

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
    .get(
        '/user/:id',
        async ({ params: id }) => {
            const response = await User.getUserById(id.id)
            return response
        }, {
        params: UserModel.GetUserById,
        response: {
            200: UserModel.GetUserByIdResponse,
            400: UserModel.GetUserByIdInvalid
        }
    }
    )