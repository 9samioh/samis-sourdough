import { z } from "zod";

export const createRecipeSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  name: z.string().min(1, "Recipe name is required"),
  description: z.string().optional().nullable(),
  servings: z.number().int().positive(),
  prepTime: z.number().int().nonnegative(),
  bakeTime: z.number().int().nonnegative(),

  ingredients: z
    .array(
      z.object({
        name: z.string().min(1),
        amount: z.number().positive(),
        unit: z.string().min(1),
      })
    )
    .min(1, "At least one ingredient is required"),
});
