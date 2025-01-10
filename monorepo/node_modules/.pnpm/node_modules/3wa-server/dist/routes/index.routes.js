"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const subtask_routes_1 = __importDefault(require("./subtask.routes"));
const task_routes_1 = __importDefault(require("./task.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/subtask", subtask_routes_1.default);
router.use("/task", task_routes_1.default);
exports.default = router;
