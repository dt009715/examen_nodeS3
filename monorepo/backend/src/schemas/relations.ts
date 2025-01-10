import { relations } from "drizzle-orm";
import { subtasks, tasks, users } from ".";

export const userRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.authorId],
    references: [users.id],
  }),

  post: one(tasks, {
    fields: [tasks.id],
    references: [tasks.authorId],
  }),
}));

export const subtasksRelation = relations(subtasks, ({ one, many }) => ({
  user: one(tasks, {
    fields: [subtasks.author],
    references: [tasks.id],
  }),
  tasks: many(subtasks),
}));
