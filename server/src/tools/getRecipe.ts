import { prisma } from "../lib/prisma.js";

export async function getRecipe(slug?: string) {
  if (!slug) {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        ingredients: true,
      },
    });
    return {
      recipes: recipes,
    };
  }
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

  return {
    recipe: recipe,
  };
}
