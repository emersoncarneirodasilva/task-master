import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpError } from "../errors/HttpError";
import {
  CreateTaskAttributes,
  OptionsToSearchAndFilter,
  TaskRepository,
} from "../repositories/contracts/TaskRepository";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(userId: number, attributes: CreateTaskAttributes) {
    const deadline =
      typeof attributes.deadline === "string"
        ? new Date(attributes.deadline)
        : attributes.deadline;

    // Verifica se a data é válida
    if (isNaN(deadline.getTime())) {
      throw new HttpError("Data inválida fornecida para o prazo.", 400);
    }

    return await this.taskRepository.create(userId, {
      ...attributes,
      deadline,
    });
  }

  async getAllTasks(userId: number, options: OptionsToSearchAndFilter) {
    const tasks = await this.taskRepository.findAllByUserId(userId, options);

    if (!tasks) {
      throw new HttpError("Nenhuma tarefa encontrada!", 404);
    }

    return tasks;
  }

  async updateTask(
    id: number,
    userId: number,
    attributes: Partial<CreateTaskAttributes>
  ) {
    // Se "deadline" estiver presente nos atributos e for uma string, converta para Date
    if (attributes.deadline && typeof attributes.deadline === "string") {
      attributes.deadline = new Date(attributes.deadline);
    }

    try {
      const task = await this.taskRepository.update(id, userId, attributes);

      return task;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Tarefa não encontrada!", 404);
      }
      throw error;
    }
  }

  async deleteTask(id: number, userId: number) {
    try {
      const task = await this.taskRepository.delete(id, userId);
      return task;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Tarefa não encontrada!", 404);
      }
      throw error;
    }
  }
}
