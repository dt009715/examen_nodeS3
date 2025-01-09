
import { Request, Response } from "express";

import {
  deleteTaskById,
  findAllTask,
  getTaskById,
  pushTask,
} from "../models/task.model";
import { APIResponse } from "../utils";


export const getAll = async (request: Request, response: Response) => {
  try {
    const tasks = await findAllTask();
    APIResponse(response, tasks, "All tasks", 200);
  } catch (err: any) {
    console.error(err);
    APIResponse(response, [], err.message, 500);
  }
};


export const findTaskById = async (request: Request, response: Response) => {
  const { id } = request.params;

  const task = await getTaskById(id);
  if (task) {
    APIResponse(response, task, "task found", 200);
  } else {
    APIResponse(response, null, "task not found", 404);
  }
};


export const createTask = async (request: Request, response: Response) => {
  const newTask = request.body;

  await pushTask(newTask);
  APIResponse(response, newTask, "task created", 201);
};


export const deleteTaskId = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { userId } = response.locals.user;

  await deleteTaskById(id, userId);
  APIResponse(response, null, "task deleted", 204);
};
