import { Router } from "express";
import { taskController } from "../container";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/tasks", AuthMiddleware.handle, taskController.createTask);
router.get("/tasks", AuthMiddleware.handle, taskController.getAllTasks);
router.put("/tasks/:id", AuthMiddleware.handle, taskController.updateTask);
router.delete("/tasks/:id", AuthMiddleware.handle, taskController.deleteTask);

export default router;
