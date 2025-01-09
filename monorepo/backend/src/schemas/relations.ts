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
    // le nom de la table est référencée ici, un commentaire est lié à un seul utilisateur
    // premièrement, on recupere la colonne qui fait référence à users dans la table comments
    fields: [tasks.id],
    // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
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
