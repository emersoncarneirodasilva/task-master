import { HttpError } from "../errors/HttpError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  CreateUserAttributes,
  UserRepository,
} from "../repositories/contracts/UserRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(attributes: CreateUserAttributes) {
    const userExists = await this.userRepository.findByEmail(attributes.email);

    if (userExists) {
      throw new HttpError(
        "Já existe um usuário cadastrado com esse e-mail!",
        409
      );
    }

    // Criptografa a senha antes de salvar
    const hashPassword = await bcrypt.hash(attributes.password, 10);
    attributes.password = hashPassword;

    return await this.userRepository.create(attributes);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpError("Usuário não encontrado!", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpError("Senha inválida!", 401);
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async updateProfile(
    id: number,
    attributes: { name?: string; email?: string }
  ) {
    try {
      const updatedUser = await this.userRepository.update(id, attributes);

      return updatedUser;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Usuário não encontrado!", 404);
      }
      throw error;
    }
  }

  async changePassword(id: number, newPassword: string, oldPassword: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpError("Usuário não encontrado!", 404);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new HttpError("Senha antiga inválida!", 401);
    }

    const hash = await bcrypt.hash(newPassword, 10);

    if (!hash) {
      throw new HttpError("Erro ao criptografar a nova senha!", 500);
    }

    return await this.userRepository.update(id, { password: hash });
  }

  async delete(id: number) {
    try {
      const user = await this.userRepository.delete(id);

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError("Usuário não encontrado!", 404);
      }
      throw error;
    }
  }
}
