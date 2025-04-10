import { Handler } from "express";
import { CategoryService } from "../services/CategoryService";
import { CreateAndUpdateCategoryRequestSchema } from "./schemas/CategoryRequestSchema";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  createCategory: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const body = CreateAndUpdateCategoryRequestSchema.parse(req.body);

      const newCategory = await this.categoryService.createCategory({
        ...body,
        userId,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  };

  getAllCategories: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;

      const categories = await this.categoryService.getAllCategories(userId);

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  getCategoryById: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const categoryId = Number(req.params.id);

      const category = await this.categoryService.getCategoryById(
        userId,
        categoryId
      );

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  updateCategory: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const categoryId = Number(req.params.id);
      const { name } = CreateAndUpdateCategoryRequestSchema.parse(req.body);

      const updatedCategory = await this.categoryService.updateCategory(
        userId,
        categoryId,
        name
      );

      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  };

  deleteCategory: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const categoryId = Number(req.params.id);

      const deletedCategory = await this.categoryService.deleteCategory(
        userId,
        categoryId
      );

      res.status(204).json({
        message: "Categoria deletada com sucesso!",
        category: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  };
}
