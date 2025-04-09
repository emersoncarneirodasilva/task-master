import { Handler } from "express";
import { UserService } from "../services/UserService";
import {
  ChangePasswordRequestSchema,
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from "./schemas/UserRequestSchema";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateUserRequestSchema.parse(req.body);

      const newUser = await this.userService.register(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  login: Handler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.userService.login(email, password);

      res.status(200).json({ message: "Usuário logado com sucesso!", user });
    } catch (error) {
      next(error);
    }
  };

  updateUser: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;
      const { name, email } = UpdateUserRequestSchema.parse(req.body);

      const updatedUser = await this.userService.updateProfile(userId, {
        name,
        email,
      });

      res
        .status(200)
        .json({ message: "Alterações feitas com sucesso!", updatedUser });
    } catch (error) {
      next(error);
    }
  };

  changePassword: Handler = async (req, res, next) => {
    try {
      const { newPassword, oldPassword } = ChangePasswordRequestSchema.parse(
        req.body
      );
      const userId = req.user!.userId;

      await this.userService.changePassword(userId, newPassword, oldPassword);

      res.status(200).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.userId;

      await this.userService.delete(userId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
