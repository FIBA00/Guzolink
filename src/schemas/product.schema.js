import { z } from "zod";

export const productSchema = z.object( {
  name: z.string().min(2, "Name is required."),
  price: z.coerce.number().positive("Use a price greater than zero."),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  category: z.string().min(1, "Choose a category."),
  description: z.string().min(12, "Use at least 12 characters."),
});
