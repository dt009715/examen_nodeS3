import { Request, Response } from "express";

import console from "console";
import {
  deleteSubTaskById,
  findAllSubtaskWithParents,
  getSubTaskById,
  pushSubTask,
} from "../models/subtask.model";
import { APIResponse } from "../utils";

export const getAll = async (request: Request, response: Response) => {
  try {
    const subtask = await findAllSubtaskWithParents();
    APIResponse(response, subtask, "All subtask with parents", 200);
  } catch (err: any) {
    console.error(err);
    APIResponse(response, [], err.message, 500);
  }
};

export const findSubTaskById = async (request: Request, response: Response) => {
  const { id } = request.params;

  const subtask = await getSubTaskById(id);
  if (subtask) {
    APIResponse(response, subtask, "subtask found", 200);
  } else {
    APIResponse(response, null, "subtask not found", 404);
  }
};

export const createSubTask = async (request: Request, response: Response) => {
  const newSubtask = request.body;

  await pushSubTask(newSubtask);
  APIResponse(response, newSubtask, "newSubtask created", 201);
};

export const deleteSubTaskId = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { userId } = response.locals.user;

  await deleteSubTaskById(id, userId);
  APIResponse(response, null, "subtask deleted", 204);
};
