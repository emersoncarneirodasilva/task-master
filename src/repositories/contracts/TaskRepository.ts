import { Priority, Status, Task } from "@prisma/client";

export interface CreateTaskAttributes {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  deadline: Date | string;
  categoryId?: number;
  categoryName?: string;
}

export interface TaskRepository {
  create: (userId: number, attributes: CreateTaskAttributes) => Promise<Task>;
  findAllByUserId: (userId: number) => Promise<Task[]>;
  findById: (id: number, userId: number) => Promise<Task | null>;
  update: (
    id: number,
    userId: number,
    attributes: Partial<CreateTaskAttributes>
  ) => Promise<Task | null>;
  delete: (id: number, userId: number) => Promise<Task | null>;
}
