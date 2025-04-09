import { Handler } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const body = req.body; // OBS: Lembrar de fazer validação com Zod

      const task = await this.taskService.createTask(userId, body);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  getAllTasks: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;

      const tasks = await this.taskService.getAllTasks(userId);

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

  getTaskById: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const taskId = Number(req.params.id);

      const task = await this.taskService.getTaskById(taskId, userId);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask: Handler = async (req, res, next) => {
    try {
      const taskId = Number(req.params.id);
      const userId = req.user!.userId;
      const body = req.body; // OBS: Lembrar de fazer validação com Zod

      const task = await this.taskService.updateTask(taskId, userId, body);

      res.status(200).json(task);
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
