import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// GET all recipes
router.get("/", async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  res.json({
    status: "success",
    results: recipes.length,
    data: recipes,
  });
});

// GET one recipe by slug
router.get("/:slug", async (req, res) => {
  const recipe = await prisma.recipe.findUnique({
    where: {
      slug: req.params.slug,
    },
    include: {
      ingredients: true,
    },
  });

  if (!recipe) {
    res.status(404).json({
      status: "error",
      message: "Recipe not found",
    });
    return;
  }

  res.json({
    status: "success",
    data: recipe,
  });
});

export default router;
