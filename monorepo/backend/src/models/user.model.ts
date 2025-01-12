import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewUser, User } from "../entities/User";
import { users } from "../schemas";
import { logger } from "../utils";

export const getAllUsers = () => {
  try {
    return db.query.users.findMany({
      columns: {
        id: true,
        username: true,
      },
    });
  } catch (err: any) {
    logger.error(
      `Erreur lors de la récupération des utilisateurs; ${err.message}`
    );
    throw new Error("Impossible de récupérer les utilisateurs");
  }
};

export const getUserById = (id: string) => {
  try {
    return db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        username: true,
      },
    });
  } catch (err: any) {
    logger.error(
      `Erreur lors de la récupération de l'utilisateur; ${err.message}`
    );
    throw new Error("Impossible de récupérer l'utilisateur");
  }
};

export const findByCredentials = (email: string) => {
  try {
    return db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });
  } catch (err: any) {
    logger.error(
      `Erreur lors de la récupération de l'utilisateur; ${err.message}`
    );
    throw new Error("Impossible de récupérer l'utilisateur");
  }
};

export const addUser = (user: NewUser) => {
  try {
    return db.insert(users).values(user).returning({ id: users.id }).execute();
  } catch (err: any) {
    logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
    throw new Error("Impossible de créer l'utilisateur");
  }
};

export const updateUser = (user: Partial<User> & { id: string }) => {
  try {
    return db.update(users).set(user).where(eq(users.id, user.id)).execute();
  } catch (err: any) {
    logger.error(`Erreur lors de màj l'utilisateur; ${err.message}`);
    throw new Error("Impossible de màj l'u'tilisateur");
  }
};
