import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpError } from "../errors/HttpError";
import {
  CategoryRepository,
  CreateCategoryAttributes,
} from "../repositories/contracts/CategoryRepository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(attributes: CreateCategoryAttributes) {
    const existingCategory = await this.categoryRepository.findByName(
      attributes
    );

    if (existingCategory) {
      throw new HttpError("Categoria já existe!", 409);
    }

    return await this.categoryRepository.create(attributes);
  }

  async getAllCategories(userId: number) {
    const categories = await this.categoryRepository.findAllByUserId(userId);

    if (!categories) {
      throw new HttpError("Nenhuma categoria encontrada!", 404);
    }

    return categories;
  }

  async getCategoryById(userId: number, id: number) {
    const category = await this.categoryRepository.findById(userId, id);

    if (!category) {
      throw new HttpError("Categoria não encontrada!", 404);
    }

    return category;
  }

  async updateCategory(userId: number, id: number, name?: string) {
    try {
      const category = await this.categoryRepository.update(userId, id, name);

      return category;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Categoria não encontrada!", 404);
      }
      throw error;
    }
  }

  async deleteCategory(userId: number, id: number) {
    try {
      const category = await this.categoryRepository.delete(userId, id);

      return category;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Categoria não encontrada!", 404);
      }
      throw error;
    }
  }
}
