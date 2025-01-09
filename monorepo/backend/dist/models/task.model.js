"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskById = exports.findAllTask = exports.deleteTaskById = exports.pushTask = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const pushTask = (task) => {
    try {
        return pool_1.db.insert(schemas_1.tasks).values(task).execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de créer la tache " + err.message);
        throw new Error("La tache ne peut pas être créee");
    }
};
exports.pushTask = pushTask;
const deleteTaskById = (id, userId) => {
    try {
        return pool_1.db
            .delete(schemas_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.tasks.id, id), (0, drizzle_orm_1.eq)(schemas_1.tasks.authorId, userId)));
    }
    catch (err) {
        utils_1.logger.error("Impossible de supprimer le commentaire " + err.message);
        throw new Error("Le commentaire ne peut pas être supprimé");
    }
};
exports.deleteTaskById = deleteTaskById;
const findAllTask = () => {
    try {
        return pool_1.db
            .select({
            id: schemas_1.tasks.id,
            content: schemas_1.tasks.content,
            task: {
                id: schemas_1.subtasks.id,
                title: schemas_1.subtasks.title,
            },
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username,
            },
        })
            .from(schemas_1.tasks)
            .leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.users.id, schemas_1.tasks.authorId))
            .leftJoin(schemas_1.subtasks, (0, drizzle_orm_1.eq)(schemas_1.subtasks.id, schemas_1.tasks.id))
            .execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de récupérer les commentaires " + err.message);
        return [];
    }
};
exports.findAllTask = findAllTask;
const getTaskById = (id) => {
    try {
        return pool_1.db
            .select({
            id: schemas_1.tasks.id,
            content: schemas_1.tasks.content,
            author: {
                id: schemas_1.users.id,
                username: schemas_1.users.username,
            },
        })
            .from(schemas_1.tasks)
            .leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.users.id, schemas_1.tasks.authorId))
            .where((0, drizzle_orm_1.eq)(schemas_1.tasks.id, id))
            .execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de récupérer le commentaire " + err.message);
        throw new Error("Le commentaire ne peut pas être recupéré");
    }
};
exports.getTaskById = getTaskById;
