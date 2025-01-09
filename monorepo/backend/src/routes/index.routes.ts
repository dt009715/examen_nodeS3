import { Router } from "express";

import authRoutes from "./auth.routes";
import postRoutes from "./subtask.routes";
import commentRoutes from "./task.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/posts", postRoutes);

router.use("/comments", commentRoutes);

export default router;
