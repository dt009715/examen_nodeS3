"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtasksRelation = exports.taskRelations = exports.userRelations = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require(".");
exports.userRelations = (0, drizzle_orm_1.relations)(_1.users, ({ many }) => ({
    tasks: many(_1.tasks),
}));
exports.taskRelations = (0, drizzle_orm_1.relations)(_1.tasks, ({ one }) => ({
    user: one(_1.users, {
        fields: [_1.tasks.authorId],
        references: [_1.users.id],
    }),
    post: one(_1.tasks, {
        // le nom de la table est référencée ici, un commentaire est lié à un seul utilisateur
        // premièrement, on recupere la colonne qui fait référence à users dans la table comments
        fields: [_1.tasks.id],
        // deuxiemement, on recupere la colonne/table qui fait reference à la colonne authorId de la table comments
        references: [_1.tasks.authorId],
    }),
}));
exports.subtasksRelation = (0, drizzle_orm_1.relations)(_1.subtasks, ({ one, many }) => ({
    user: one(_1.tasks, {
        fields: [_1.subtasks.author],
        references: [_1.tasks.id],
    }),
    tasks: many(_1.subtasks),
}));
