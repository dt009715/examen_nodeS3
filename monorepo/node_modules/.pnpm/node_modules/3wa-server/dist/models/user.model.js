"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.addUser = exports.findByCredentials = exports.getUserById = exports.getAllUsers = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const getAllUsers = () => {
    try {
        return pool_1.db.query.users.findMany({
            columns: {
                id: true,
                username: true,
            },
        });
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
        throw new Error("Impossible de récupérer les utilisateurs");
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = (id) => {
    try {
        return pool_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
            columns: {
                id: true,
                username: true,
            },
        });
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur");
    }
};
exports.getUserById = getUserById;
const findByCredentials = (email) => {
    try {
        return pool_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.users.email, email),
            columns: {
                id: true,
                email: true,
                username: true,
                password: true,
            },
        });
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de récupérer l'utilisateur");
    }
};
exports.findByCredentials = findByCredentials;
const addUser = (user) => {
    try {
        return pool_1.db.insert(schemas_1.users).values(user).returning({ id: schemas_1.users.id }).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
        throw new Error("Impossible de créer l'utilisateur");
    }
};
exports.addUser = addUser;
const updateUser = (user) => {
    try {
        return pool_1.db.update(schemas_1.users).set(user).where((0, drizzle_orm_1.eq)(schemas_1.users.id, user.id)).execute();
    }
    catch (err) {
        utils_1.logger.error(`Erreur lors de màj l'utilisateur; ${err.message}`);
        throw new Error("Impossible de màj l'u'tilisateur");
    }
};
exports.updateUser = updateUser;
