import type { Recipe } from "../types/recipe.js";

export const recipes: Recipe[] = [
  {
    id: 1,
    slug: "classic-sourdough",
    name: "Classic Sourdough",
    description:
      "A simple, naturally leavened sourdough loaf with a crisp crust.",
    ingredients: [
      { name: "Bread flour", amount: 500, unit: "g" },
      { name: "Water", amount: 350, unit: "g" },
      { name: "Active sourdough starter", amount: 100, unit: "g" },
      { name: "Salt", amount: 10, unit: "g" },
    ],
    servings: 1,
    prepTime: 900,
    bakeTime: 45,
  },
  {
    id: 2,
    slug: "focaccia",
    name: "Sourdough Focaccia",
    description: "A soft, airy focaccia with a golden, olive-oil-rich crust.",
    ingredients: [
      { name: "Bread flour", amount: 500, unit: "g" },
      { name: "Water", amount: 400, unit: "g" },
      { name: "Active sourdough starter", amount: 100, unit: "g" },
      { name: "Salt", amount: 10, unit: "g" },
      { name: "Olive oil", amount: 30, unit: "g" },
    ],
    servings: 1,
    prepTime: 600,
    bakeTime: 30,
  },
];
