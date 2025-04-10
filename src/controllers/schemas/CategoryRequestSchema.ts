import z from "zod";

export const CreateAndUpdateCategoryRequestSchema = z.object({
  name: z.string().min(3).max(50),
});
