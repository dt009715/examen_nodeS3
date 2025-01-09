import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

// id sequentielle ( 1, 2, 3, ... ... )
// uuid UNIVERSALLY UNIQUE IDENTIFIER

export const subtasks = pgTable("task", {
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
