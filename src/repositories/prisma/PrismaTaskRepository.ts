import { Task } from "@prisma/client";
import {
  CreateTaskAttributes,
  TaskRepository,
} from "../contracts/TaskRepository";
import { prisma } from "../../database";

export class PrismaTaskRepository implements TaskRepository {
  create(userId: number, attributes: CreateTaskAttributes): Promise<Task> {
    return prisma.task.create({
      data: {
        ...attributes,
        userId,
      },
    });
  }

  findAllByUserId(userId: number): Promise<Task[]> {
    return prisma.task.findMany({ where: { userId } });
  }

  findById(id: number, userId: number): Promise<Task | null> {
    return prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  update(
    id: number,
    userId: number,
    attributes: Partial<CreateTaskAttributes>
  ): Promise<Task | null> {
    return prisma.task.update({
      where: {
        id: id,
        userId: userId,
      },
      data: attributes,
    });
  }

  delete(id: number, userId: number): Promise<Task | null> {
    return prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
