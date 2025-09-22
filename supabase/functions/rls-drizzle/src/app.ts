import { AppEnv } from "./types/app.ts";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { attachDbTx, validateJWT } from "./middleware/verify-jwt.ts";
import { todos } from "./db/schema.ts";

const functionName = "rls-drizzle";
export const createHonoApp = () => {
  const app = new Hono<AppEnv>().basePath(`/${functionName}`);

  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "apikey",
        "x-client-info",
        "x-supabase-auth",
        "cache-control",
        "x-use-cookie",
      ],
      exposeHeaders: ["*"],
      credentials: false,
    }),
  );

  app.get("/todos", validateJWT, attachDbTx, async (c) => {
    const db = c.get("db");
    const foundTodos = await db.select().from(todos);
    return c.json({ data: foundTodos }, 200);
  });

  return app;
};
