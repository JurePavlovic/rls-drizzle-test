import { uuid } from "drizzle-orm/pg-core";
import { pgSchema } from "drizzle-orm/pg-core/schema";

//This is here so we can reference the auth.users table in the app. Not used in migrations
export const auth = pgSchema("auth");
export const authUsers = auth.table("users", {
  id: uuid().primaryKey().notNull(),
});
