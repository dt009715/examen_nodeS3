"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtasks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const task_1 = require("./task");
const users_1 = require("./users");
// id sequentielle ( 1, 2, 3, ... ... )
// uuid UNIVERSALLY UNIQUE IDENTIFIER
exports.subtasks = (0, pg_core_1.pgTable)("subtask", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    parentId: (0, pg_core_1.uuid)("parent_id")
        .references(() => task_1.tasks.id, { onDelete: "cascade" })
        .notNull(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    author: (0, pg_core_1.uuid)("author")
        .references(() => users_1.users.id, { onDelete: "cascade" })
        .notNull(),
    created_at: (0, pg_core_1.timestamp)("date").defaultNow(),
});
