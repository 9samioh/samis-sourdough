import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { createRecipeSchema } from "../schemas/recipeSchema.js";
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
// POST one recipe
router.post("/", async (req, res) => {
    const result = createRecipeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Invalid recipe data",
            errors: result.error.flatten(),
        });
        return;
    }
    const recipeData = result.data;
    const recipe = await prisma.recipe.create({
        data: {
            slug: recipeData.slug,
            name: recipeData.name,
            description: recipeData.description,
            ingredients: {
                create: recipeData.ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                })),
            },
            servings: recipeData.servings,
            prepTime: recipeData.prepTime,
            bakeTime: recipeData.bakeTime,
        },
        include: {
            ingredients: true,
        },
    });
    res.status(201).json({ status: "success", data: recipe });
});
// PUT edit one recipe by slug
router.put("/:slug", async (req, res) => {
    const recipeSlug = req.params.slug;
    const result = createRecipeSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            status: "error",
            message: "Invalid recipe data",
            errors: result.error.flatten(),
        });
        return;
    }
    const recipeData = result.data;
    const recipe = await prisma.recipe.update({
        where: {
            slug: recipeSlug,
        },
        data: {
            slug: recipeData.slug,
            name: recipeData.name,
            description: recipeData.description,
            ingredients: {
                deleteMany: {},
                create: recipeData.ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                })),
            },
            servings: recipeData.servings,
            prepTime: recipeData.prepTime,
            bakeTime: recipeData.bakeTime,
        },
        include: {
            ingredients: true,
        },
    });
    res.status(200).json({ status: "success", data: recipe });
});
// DELETE a recipe
router.delete("/:slug", async (req, res) => {
    const recipeSlug = req.params.slug;
    const deleteRecipe = await prisma.recipe.delete({
        where: {
            slug: recipeSlug,
        },
    });
    res.status(200).json({ status: "success", data: deleteRecipe });
});
export default router;
