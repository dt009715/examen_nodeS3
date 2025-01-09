import { Router } from "express";
import {
  createSubTask,
  deleteSubTaskId,
  getAll,
} from "../controllers/subtask.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAll);

router.post("/", authMiddleware, createSubTask);

router.delete("/:id", authMiddleware, deleteSubTaskId);

export default router;
