import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { subtasks } from "../schemas";


export type subtask = InferSelectModel<typeof subtasks>;

export type newSubtask = InferInsertModel<typeof subtasks>;


export type subtaskColumns = { [K in keyof subtask]?: boolean };
