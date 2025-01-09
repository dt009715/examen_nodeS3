"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskId = exports.createTask = exports.findTaskById = exports.getAll = void 0;
const task_model_1 = require("../models/task.model");
const utils_1 = require("../utils");
const getAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, task_model_1.findAllTask)();
        (0, utils_1.APIResponse)(response, tasks, "All tasks", 200);
    }
    catch (err) {
        console.error(err);
        (0, utils_1.APIResponse)(response, [], err.message, 500);
    }
});
exports.getAll = getAll;
const findTaskById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const task = yield (0, task_model_1.getTaskById)(id);
    if (task) {
        (0, utils_1.APIResponse)(response, task, "task found", 200);
    }
    else {
        (0, utils_1.APIResponse)(response, null, "task not found", 404);
    }
});
exports.findTaskById = findTaskById;
const createTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = request.body;
    yield (0, task_model_1.pushTask)(newTask);
    (0, utils_1.APIResponse)(response, newTask, "task created", 201);
});
exports.createTask = createTask;
const deleteTaskId = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { userId } = response.locals.user;
    yield (0, task_model_1.deleteTaskById)(id, userId);
    (0, utils_1.APIResponse)(response, null, "task deleted", 204);
});
exports.deleteTaskId = deleteTaskId;
