import { Elysia } from "elysia";
import { user } from "./modules/user";
import { auth } from "./modules/auth";
import { logger } from "@bogeychan/elysia-logger";

const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  .use(user)
  .use(auth)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
