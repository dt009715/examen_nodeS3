import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { tasks } from "./task";
import { users } from "./users";

export const subtasks = pgTable("subtask", {
  id: uuid("id").defaultRandom().primaryKey(),
  parentId: uuid("parent_id")
    .references(() => tasks.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  author: uuid("author")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("date").defaultNow(),
});
