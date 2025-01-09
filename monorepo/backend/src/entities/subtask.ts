import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { subtasks } from "../schemas";

// Un type pour le modèle d'un post au moment de la selection dans la DB
export type subtask = InferSelectModel<typeof subtasks>;

// Un type pour le modèle d'un post au moment de son insertion dans la DB
export type newSubtask = InferInsertModel<typeof subtasks>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table post
export type subtaskColumns = { [K in keyof subtask]?: boolean };
