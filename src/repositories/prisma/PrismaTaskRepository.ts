import { Task } from "@prisma/client";
import {
  CreateTaskAttributes,
  TaskRepository,
} from "../contracts/TaskRepository";
import { prisma } from "../../database";

export class PrismaTaskRepository implements TaskRepository {
  async create(
    userId: number,
    attributes: CreateTaskAttributes
  ): Promise<Task> {
    const { categoryId, categoryName, ...taskData } = attributes;

    return prisma.task.create({
      data: {
        ...taskData,
        user: {
          connect: { id: userId },
        },
        category: categoryName
          ? {
              connectOrCreate: {
                where: { name_userId: { name: categoryName, userId } },
                create: { name: categoryName, userId },
              },
            }
          : categoryId
          ? {
              connect: { id: categoryId },
            }
          : undefined,
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
