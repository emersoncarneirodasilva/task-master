import { Category } from "@prisma/client";
import { prisma } from "../../database";
import {
  CategoryRepository,
  CreateCategoryAttributes,
} from "../contracts/CategoryRepository";

export class PrismaCategoryRepository implements CategoryRepository {
  async create(attributes: CreateCategoryAttributes): Promise<Category> {
    return await prisma.category.create({
      data: {
        name: attributes.name,
        userId: attributes.userId,
      },
    });
  }

  async findById(userId: number, id: number): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async findByName(
    attributes: CreateCategoryAttributes
  ): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: {
        name: attributes.name,
        userId: attributes.userId,
      },
      include: {
        tasks: true,
      },
    });
  }

  async findAllByUserId(userId: number): Promise<Category[]> {
    return await prisma.category.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  async update(
    userId: number,
    id: number,
    name: string
  ): Promise<Category | null> {
    return await prisma.category.update({
      where: {
        id,
        userId,
      },
      data: { name },
    });
  }

  async delete(userId: number, id: number): Promise<Category | null> {
    return await prisma.category.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
