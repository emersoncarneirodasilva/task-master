import { Category } from "@prisma/client";
import { prisma } from "../../database";
import {
  CategoryRepository,
  CreateCategoryAttributes,
} from "../contracts/CategoryRepository";

export class PrismaCategoryRepository implements CategoryRepository {
  create(attributes: CreateCategoryAttributes): Promise<Category> {
    return prisma.category.create({
      data: {
        name: attributes.name,
        userId: attributes.userId,
      },
    });
  }

  findById(userId: number, id: number): Promise<Category | null> {
    return prisma.category.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  findByName(attributes: CreateCategoryAttributes): Promise<Category | null> {
    return prisma.category.findFirst({
      where: {
        name: attributes.name,
        userId: attributes.userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  findAllByUserId(userId: number): Promise<Category[]> {
    return prisma.category.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  update(userId: number, id: number, name: string): Promise<Category | null> {
    return prisma.category.update({
      where: {
        id,
        userId,
      },
      data: { name },
    });
  }

  delete(userId: number, id: number): Promise<Category | null> {
    return prisma.category.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
