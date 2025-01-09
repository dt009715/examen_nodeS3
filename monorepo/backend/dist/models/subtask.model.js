"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubTaskById = exports.findAllSubtaskWithParents = exports.deleteSubTaskById = exports.pushSubTask = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const pushSubTask = (subtask) => {
    try {
        return pool_1.db.insert(schemas_1.subtasks).values(subtask).execute();
    }
    catch (err) {
        utils_1.logger.error("Impossible de créer la sous-tache " + err.message);
        throw new Error("La sous-tache ne peut pas être crée");
    }
};
exports.pushSubTask = pushSubTask;
const deleteSubTaskById = (id, userId) => {
    try {
        return pool_1.db
            .delete(schemas_1.subtasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.subtasks.id, id), (0, drizzle_orm_1.eq)(schemas_1.subtasks.parentId, userId)));
    }
    catch (err) {
        utils_1.logger.error("Impossible de supprimer la sous-tache " + err.message);
        throw new Error("La sous-tache ne peut pas être supprimé");
    }
};
exports.deleteSubTaskById = deleteSubTaskById;
const findAllSubtaskWithParents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield pool_1.db
        .select({
        subtaskId: schemas_1.subtasks.id,
        subtaskTitle: schemas_1.subtasks.title,
        parentId: schemas_1.tasks.id,
        parentTitle: schemas_1.tasks.title,
    })
        .from(schemas_1.subtasks)
        .leftJoin(schemas_1.tasks, (0, drizzle_orm_1.eq)(schemas_1.subtasks.parentId, schemas_1.tasks.id));
});
exports.findAllSubtaskWithParents = findAllSubtaskWithParents;
const getSubTaskById = (id) => {
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
        utils_1.logger.error("Impossible de récupérer la sous-tache " + err.message);
        throw new Error("La sous-tache ne peut pas être recupérée");
    }
};
exports.getSubTaskById = getSubTaskById;
