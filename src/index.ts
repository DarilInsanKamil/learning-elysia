import { Elysia } from "elysia";
import { user } from "./modules/user";
import { auth } from "./modules/auth";
import { logger } from "@bogeychan/elysia-logger";
import { album } from "./modules/album";
import staticPlugin from "@elysiajs/static";
import { song } from "./modules/song";
import { playlist } from "./modules/playlist";
import { albumLike } from "./modules/albumLike";

export const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  .use(staticPlugin())
  .use(user)
  .use(auth)
  .use(album)
  .use(albumLike)
  .use(playlist)
  .use(song)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
