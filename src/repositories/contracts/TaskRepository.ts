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

export interface OptionsToSearchAndFilter {
  page?: number;
  perPage?: number;
  search?: string;
  status?: string;
  priority?: string;
}

export interface PaginatedTasks {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface TaskRepository {
  create: (userId: number, attributes: CreateTaskAttributes) => Promise<Task>;
  findAllByUserId: (
    userId: number,
    options: OptionsToSearchAndFilter
  ) => Promise<PaginatedTasks>;
  update: (
    id: number,
    userId: number,
    attributes: Partial<CreateTaskAttributes>
  ) => Promise<Task | null>;
  delete: (id: number, userId: number) => Promise<Task | null>;
}
