"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require(".");
exports.tasks = (0, pg_core_1.pgTable)("comments", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    authorId: (0, pg_core_1.uuid)("author_id")
        .references(() => _1.users.id, { onDelete: "cascade" })
        .notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
