import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { tasks } from "../schemas";

// Un type pour le modèle d'un Comment au moment de la selection dans la DB
export type task = InferSelectModel<typeof tasks>;

// Un type pour le modèle d'un Comment au moment de son insertion dans la DB
export type newTask = InferInsertModel<typeof tasks>;

// Un type qui sera un objet avec des clés optionnelles qui correspondent aux colonnes de notre table Comment
export type TaskColumns = { [K in keyof Comment]?: boolean };
