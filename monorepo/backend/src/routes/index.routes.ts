import { Router } from "express";

import authRoutes from "./auth.routes";
import subtaskRoutes from "./subtask.routes";
import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/subtask", subtaskRoutes);

router.use("/task", taskRoutes);

export default router;
