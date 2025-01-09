import { Router } from "express";
import {
  createTask,
  deleteTaskId,
  findTaskById,
  getAll,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAll);

router.get("/:id", findTaskById);

router.post("/", authMiddleware, createTask);

router.delete("/:id", authMiddleware, deleteTaskId);

export default router;
