import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { createClient } from "supabase";
import { sql } from "drizzle-orm";
import { db } from "../db/index.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

export const validateJWT = createMiddleware(async (c: Context, next: Next) => {
  const h = c.req.header("Authorization");
  if (!h || !h.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await supabase.auth.getClaims(h.substring(7));
  if (error || !data?.claims?.sub) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  c.set("userId", data.claims.sub as string);

  await next();
});

export const attachDbTx = createMiddleware((c: Context, next: Next) => {
  const userId = c.get("userId");
  return db.transaction(async (tx) => {
    await tx.execute(sql`set local role app_user`);
    await tx.execute(
      sql`select set_config('request.jwt.claim.sub', ${userId}, true)`,
    );
    await tx.execute(
      sql`select set_config('request.jwt.claim.role', ${"authenticated"}, true)`,
    );
    await tx.execute(
      sql`select set_config('request.jwt.claims', ${JSON.stringify({
        sub: userId,
        role: "authenticated",
      })}, true)`,
    );
    c.set("db", tx);
    return next();
  });
});
