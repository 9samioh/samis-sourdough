import { prisma } from "./lib/prisma.js";
import { recipes } from "./data/recipes.js";

async function main() {
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: {
        slug: recipe.slug,
      },
      update: {
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        bakeTime: recipe.bakeTime,
      },
      create: {
        slug: recipe.slug,
        name: recipe.name,
        description: recipe.description,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        bakeTime: recipe.bakeTime,
        ingredients: {
          create: recipe.ingredients,
        },
      },
    });
  }

  console.log("Recipes successfully added to the database!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
