import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { authUsers } from "./auth.ts";

export const usersData = pgTable("users_data", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id),
  firstName: text("first_name"),
  lastName: text("last_name"),
  username: text("username").unique(),
  profileImageUrl: text("profile_image_url"),
  profileImageBlurhash: text("profile_image_blurhash"),
  email: text("email").notNull(),
  deleted: boolean("deleted").notNull().default(false),
  completedOboarding: boolean("completed_onboarding").notNull().default(false),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();
