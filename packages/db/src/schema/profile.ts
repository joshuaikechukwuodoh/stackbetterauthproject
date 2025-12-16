import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const profile = pgTable("profile", {
    id: uuid("id").primaryKey(),
    user_id: uuid("user_id").notNull().references(() => user.id),
    name: text("name").notNull(),
    bio: text("bio"),
    avatar_url: text("avatar_url"),
    cover_url: text("cover_url"),
    location: text("location"),
    website: text("website"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});