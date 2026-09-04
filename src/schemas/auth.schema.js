import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must contain at least 6 characters."),
});
export const registerSchema = signInSchema.extend({
  name: z.string().min(2, "Enter your name."),
});
