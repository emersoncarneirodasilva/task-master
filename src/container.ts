import { PrismaUserRepository } from "./repositories/prisma/PrismaUserRepository";
import { PrismaTaskRepository } from "./repositories/prisma/PrismaTaskRepository";
import { UserService } from "./services/UserService";
import { TaskService } from "./services/TaskService";
import { UserController } from "./controllers/UserController";
import { TaskController } from "./controllers/TaskController";
import { PrismaCategoryRepository } from "./repositories/prisma/PrismaCategoryRepository";
import { CategoryService } from "./services/CategoryService";
import { CategoryController } from "./controllers/CategoryController";

export const userRepository = new PrismaUserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const taskRepository = new PrismaTaskRepository();
export const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);

export const categoryRepository = new PrismaCategoryRepository();
export const categoryService = new CategoryService(categoryRepository);
export const categoryController = new CategoryController(categoryService);
