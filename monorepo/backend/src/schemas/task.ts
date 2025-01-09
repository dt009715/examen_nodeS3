import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from ".";

export const tasks = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
