import { Elysia } from "elysia";
import { user } from "./modules/user";
import { auth } from "./modules/auth";
import { logger } from "@bogeychan/elysia-logger";
import { album } from "./modules/album";

const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  .use(user)
  .use(auth)
  .use(album)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
