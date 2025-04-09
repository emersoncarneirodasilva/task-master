import { User } from "@prisma/client";

export interface CreateUserAttributes {
  name: string;
  email: string;
  password: string;
}

export interface UserRepository {
  create: (attributes: CreateUserAttributes) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
  update: (
    id: number,
    attributes: Partial<CreateUserAttributes>
  ) => Promise<User | null>;
  delete: (id: number) => Promise<User | null>;
}
