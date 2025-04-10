import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { categoryController } from "../container";

const router = Router();

router.post(
  "/categories",
  AuthMiddleware.handle,
  categoryController.createCategory
);

router.get(
  "/categories",
  AuthMiddleware.handle,
  categoryController.getAllCategories
);

router.get(
  "/categories/:id",
  AuthMiddleware.handle,
  categoryController.getCategoryById
);

router.put(
  "/categories/:id",
  AuthMiddleware.handle,
  categoryController.updateCategory
);

router.delete(
  "/categories/:id",
  AuthMiddleware.handle,
  categoryController.deleteCategory
);

export default router;
