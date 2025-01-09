import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { newSubtask } from "../entities/subtask";
import { subtasks, tasks, users } from "../schemas";
import { logger } from "../utils";

export const pushSubTask = (subtask: newSubtask) => {
  try {
    return db.insert(subtasks).values(subtask).execute();
  } catch (err: any) {
    logger.error("Impossible de créer la sous-tache " + err.message);
    throw new Error("La sous-tache ne peut pas être crée");
  }
};

export const deleteSubTaskById = (id: string, userId: string) => {
  try {
    return db
      .delete(subtasks)
      .where(and(eq(subtasks.id, id), eq(subtasks.parentId, userId)));
  } catch (err: any) {
    logger.error("Impossible de supprimer la sous-tache " + err.message);
    throw new Error("La sous-tache ne peut pas être supprimé");
  }
};

export const findAllSubtaskWithParents = async () => {
  return await db
    .select({
      subtaskId: subtasks.id,
      subtaskTitle: subtasks.title,
      parentId: tasks.id,
      parentTitle: tasks.title,
    })
    .from(subtasks)
    .leftJoin(tasks, eq(subtasks.parentId, tasks.id));
};

export const getSubTaskById = (id: string) => {
  try {
    return db
      .select({
        id: tasks.id,
        content: tasks.content,
        author: {
          id: users.id,
          username: users.username,
        },
      })
      .from(tasks)
      .leftJoin(users, eq(users.id, tasks.authorId))
      .where(eq(tasks.id, id))
      .execute();
  } catch (err: any) {
    logger.error("Impossible de récupérer la sous-tache " + err.message);
    throw new Error("La sous-tache ne peut pas être recupérée");
  }
};
