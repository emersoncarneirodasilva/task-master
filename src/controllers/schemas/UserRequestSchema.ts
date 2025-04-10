import { z } from "zod";

export const CreateUserRequestSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export const LoginUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export const UpdateUserRequestSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
});

export const ChangePasswordRequestSchema = z.object({
  newPassword: z.string().min(6).max(50),
  oldPassword: z.string().min(6).max(50),
});
