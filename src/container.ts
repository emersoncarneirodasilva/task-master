import { PrismaUserRepository } from "./repositories/prisma/PrismaUserRepository";
import { PrismaTaskRepository } from "./repositories/prisma/PrismaTaskRepository";
import { UserService } from "./services/UserService";
import { TaskService } from "./services/TaskService";
import { UserController } from "./controllers/UserController";
import { TaskController } from "./controllers/TaskController";

export const userRepository = new PrismaUserRepository();
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);

export const taskRepository = new PrismaTaskRepository();
export const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);
