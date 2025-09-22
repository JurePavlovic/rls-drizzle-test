import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./supabase/functions/rls-drizzle/src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  migrations: {
    prefix: "timestamp",
  },
});
