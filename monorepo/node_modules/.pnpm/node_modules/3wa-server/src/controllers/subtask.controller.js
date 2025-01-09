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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubTaskId = exports.createSubTask = exports.findSubTaskById = exports.getAll = void 0;
const console_1 = __importDefault(require("console"));
const subtask_model_1 = require("../models/subtask.model");
const utils_1 = require("../utils");
const getAll = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtask = yield (0, subtask_model_1.findAllSubtaskWithParents)();
        (0, utils_1.APIResponse)(response, subtask, "All subtask with parents", 200);
    }
    catch (err) {
        console_1.default.error(err);
        (0, utils_1.APIResponse)(response, [], err.message, 500);
    }
});
exports.getAll = getAll;
const findSubTaskById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const subtask = yield (0, subtask_model_1.getSubTaskById)(id);
    if (subtask) {
        (0, utils_1.APIResponse)(response, subtask, "subtask found", 200);
    }
    else {
        (0, utils_1.APIResponse)(response, null, "subtask not found", 404);
    }
});
exports.findSubTaskById = findSubTaskById;
const createSubTask = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newSubtask = request.body;
    yield (0, subtask_model_1.pushSubTask)(newSubtask);
    (0, utils_1.APIResponse)(response, newSubtask, "newSubtask created", 201);
});
exports.createSubTask = createSubTask;
const deleteSubTaskId = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { userId } = response.locals.user;
    yield (0, subtask_model_1.deleteSubTaskById)(id, userId);
    (0, utils_1.APIResponse)(response, null, "subtask deleted", 204);
});
exports.deleteSubTaskId = deleteSubTaskId;
