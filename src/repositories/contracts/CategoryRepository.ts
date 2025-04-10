import { Category } from "@prisma/client";

export interface CreateCategoryAttributes {
  name: string;
  userId: number;
}

export interface CategoryRepository {
  create(attributes: CreateCategoryAttributes): Promise<Category>;
  findAllByUserId(userId: number): Promise<Category[]>;
  findById(userId: number, id: number): Promise<Category | null>;
  update(userId: number, id: number, name?: string): Promise<Category | null>;
  delete(userId: number, id: number): Promise<Category | null>;
  findByName(attributes: CreateCategoryAttributes): Promise<Category | null>;
}
