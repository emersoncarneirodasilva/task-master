import { Handler } from "express";
import { TaskService } from "../services/TaskService";
import {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
} from "./schemas/TaskRequestSchema";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const { categoryName, categoryId, ...taskData } =
        CreateTaskRequestSchema.parse(req.body);

      const newTask = await this.taskService.createTask(userId, {
        ...taskData,
        categoryName,
        categoryId,
      });

      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  };

  getAllTasks: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;

      const { search, status, priority, page = "1", limit = "10" } = req.query;

      const tasks = await this.taskService.getAllTasks(userId, {
        search: search?.toString(),
        status: status?.toString(),
        priority: priority?.toString(),
        page: Number(page),
        perPage: Number(limit),
      });

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

  updateTask: Handler = async (req, res, next) => {
    try {
      const taskId = Number(req.params.id);
      const userId = req.user!.userId;
      const body = UpdateTaskRequestSchema.parse(req.body);

      const updatedTask = await this.taskService.updateTask(
        taskId,
        userId,
        body
      );

      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };

  deleteTask: Handler = async (req, res, next) => {
    try {
      const taskId = Number(req.params.id);
      const userId = req.user!.userId;

      const deletedTask = await this.taskService.deleteTask(taskId, userId);

      res
        .status(204)
        .json({ message: "Tarefa deletada com sucesso!", task: deletedTask });
    } catch (error) {
      next(error);
    }
  };
}
