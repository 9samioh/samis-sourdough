import { Router } from "express";
import { recipes } from "../data/recipes.js";
const router = Router();
// GET all recipes
router.get("/", (req, res) => {
    res.json({
        status: "success",
        results: recipes.length,
        data: recipes,
    });
});
// GET one recipe by slug
router.get("/:slug", (req, res) => {
    const recipe = recipes.find((recipe) => recipe.slug === req.params.slug);
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
