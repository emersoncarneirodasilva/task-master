import { User } from "@prisma/client";
import { prisma } from "../../database";
import {
  CreateUserAttributes,
  UserRepository,
} from "../contracts/UserRepository";

export class PrismaUserRepository implements UserRepository {
  async create(attributes: CreateUserAttributes): Promise<User> {
    return await prisma.user.create({ data: attributes });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: number,
    attributes: Partial<CreateUserAttributes>
  ): Promise<User | null> {
    return await prisma.user.update({
      where: { id },
      data: attributes,
    });
  }

  async delete(id: number): Promise<User | null> {
    return await prisma.user.delete({ where: { id } });
  }
}
