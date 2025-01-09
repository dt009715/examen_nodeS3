import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { tasks } from "../schemas";

export type task = InferSelectModel<typeof tasks>;

export type newTask = InferInsertModel<typeof tasks>;

export type TaskColumns = { [K in keyof Comment]?: boolean };
