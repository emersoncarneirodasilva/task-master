import z from "zod";

export const CreateTaskRequestSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["DONE", "PENDING", "IN_PROGRESS"]),
  deadline: z.union([z.date(), z.string()]),
  categoryId: z.number().optional(),
  categoryName: z.string().optional(),
});

export const UpdateTaskRequestSchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  status: z.enum(["DONE", "PENDING", "IN_PROGRESS"]).optional(),
  deadline: z.union([z.date(), z.string()]).optional(),
  categoryId: z.number().optional(),
  categoryName: z.string().optional(),
});
