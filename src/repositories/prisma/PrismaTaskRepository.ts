import { prisma } from "../../database";
import { Priority, Status, Task } from "@prisma/client";
import {
  CreateTaskAttributes,
  OptionsToSearchAndFilter,
  PaginatedTasks,
  TaskRepository,
} from "../contracts/TaskRepository";
import filterEnumValues from "../../utils/filterEnumValues";

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

  async findAllByUserId(
    userId: number,
    options: OptionsToSearchAndFilter
  ): Promise<PaginatedTasks> {
    const { page = 1, perPage = 10, search, status, priority } = options || {};

    const filteredStatus = status
      ? filterEnumValues(status, Status)
      : undefined;
    const filteredPriority = priority
      ? filterEnumValues(priority, Priority)
      : undefined;

    const filters = Object.fromEntries(
      Object.entries({
        userId,
        title: search ? { contains: search, mode: "insensitive" } : undefined,
        status: filteredStatus ? { in: filteredStatus } : undefined,
        priority: filteredPriority ? { in: filteredPriority } : undefined,
      }).filter(([_, value]) => value !== undefined)
    );

    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        where: filters,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: { deadline: "desc" },
      }),
      prisma.task.count({ where: filters }),
    ]);

    const totalPages = Math.ceil(totalTasks / perPage);

    return {
      tasks,
      totalTasks,
      totalPages,
      currentPage: page,
      perPage,
    };
  }

  async update(
    id: number,
    userId: number,
    attributes: Partial<CreateTaskAttributes>
  ): Promise<Task | null> {
    return await prisma.task.update({
      where: {
        id: id,
        userId: userId,
      },
      data: attributes,
    });
  }

  async delete(id: number, userId: number): Promise<Task | null> {
    return await prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
