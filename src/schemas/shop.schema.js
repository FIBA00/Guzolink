import { z } from "zod";
export const shopSchema = z.object({
  name: z.string().min(2, "Enter a shop name."),
  slug: z
    .string()
    .min(3, "Use at least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().min(20, "Tell shoppers a little more."),
  phone: z.string().min(7, "Enter a contact number."),
  location: z.string().min(2, "Enter your location."),
});
