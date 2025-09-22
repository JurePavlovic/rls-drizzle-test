import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";

const connectionString =
  Deno.env.get("DATABASE_URL") || Deno.env.get("SUPABASE_DB_URL") || "";

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

console.log(connectionString);
const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, { schema });
export type DrizzleClient = typeof db;
export type DrizzleTransaction = Parameters<
  Parameters<DrizzleClient["transaction"]>[0]
>[0];

export const disconnectDb = async () => {
  await client.end();
  console.log("Database connection closed.");
};
