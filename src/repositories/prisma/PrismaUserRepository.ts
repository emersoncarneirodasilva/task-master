import { User } from "@prisma/client";
import { prisma } from "../../database";
import {
  CreateUserAttributes,
  UserRepository,
} from "../contracts/UserRepository";

export class PrismaUserRepository implements UserRepository {
  create(attributes: CreateUserAttributes): Promise<User> {
    return prisma.user.create({ data: attributes });
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  update(
    id: number,
    attributes: Partial<CreateUserAttributes>
  ): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: attributes,
    });
  }

  delete(id: number): Promise<User | null> {
    return prisma.user.delete({ where: { id } });
  }
}
