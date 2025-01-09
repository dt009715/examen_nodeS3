import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { subtasks, tasks, users } from "../schemas";
import { logger } from "../utils";
import { newTask } from "../entities/task";

export const pushTask = (task: newTask) => {
  try {
    return db.insert(tasks).values(task).execute();
  } catch (err: any) {
    logger.error("Impossible de créer la tache " + err.message);
    throw new Error("La tache ne peut pas être créee");
  }
};

export const deleteTaskById = (id: string, userId: string) => {
  try {
    return db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.authorId, userId)));
  } catch (err: any) {
    logger.error("Impossible de supprimer le commentaire " + err.message);
    throw new Error("Le commentaire ne peut pas être supprimé");
  }
};

export const findAllTask = () => {
  try {
    return db
      .select({
        id: tasks.id,
        content: tasks.content,
        post: {
          id: subtasks.id,
          title: subtasks.title,
        },
        author: {
          id: users.id,
          username: users.username,
        },
      })
      .from(tasks)
      .leftJoin(users, eq(users.id, tasks.authorId))
      .leftJoin(subtasks, eq(subtasks.id, tasks.postId))
      .execute();
  } catch (err: any) {
    logger.error("Impossible de récupérer les commentaires " + err.message);
    return [];
  }
};

export const getTaskById = (id: string) => {
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
    logger.error("Impossible de récupérer le commentaire " + err.message);
    throw new Error("Le commentaire ne peut pas être recupéré");
  }
};
