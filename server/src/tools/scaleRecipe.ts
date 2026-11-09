import { prisma } from "../lib/prisma.js";

export async function scaleRecipe(slug: string, targetServings: number) {
  // Validate requested servings
  if (!Number.isInteger(targetServings) || targetServings < 1) {
    throw new Error("Target servings must be a positive integer.");
  }

  // Retrieve recipe and ingredients from PostgreSQL
  const recipe = await prisma.recipe.findUnique({
    where: {
      slug,
    },
    include: {
      ingredients: true,
    },
  });

  if (!recipe) {
    return {
      error: `Recipe "${slug}" was not found.`,
    };
  }

  // Calculate scaling multiplier
  const multiplier = targetServings / recipe.servings;

  // Scale each ingredient
  const scaledIngredients = recipe.ingredients.map((ingredient) => ({
    name: ingredient.name,
    originalAmount: ingredient.amount,
    scaledAmount:
      Math.round((ingredient.amount * multiplier + Number.EPSILON) * 100) / 100,
    unit: ingredient.unit,
  }));

  return {
    recipeName: recipe.name,
    originalServings: recipe.servings,
    targetServings,
    multiplier,
    ingredients: scaledIngredients,
  };
}
