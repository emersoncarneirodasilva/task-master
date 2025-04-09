import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userController } from "../container";

const router = Router();

router.post("/login", userController.login);
router.post("/users", userController.create);
router.put("/users", AuthMiddleware.handle, userController.updateUser);
router.patch(
  "/users/change-password",
  AuthMiddleware.handle,
  userController.changePassword
);
router.delete("/users", AuthMiddleware.handle, userController.delete);

export default router;
