export interface Recipe {
  id: number;
  slug: string;
  name: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  servings: number;
  prepTime: number;
  bakeTime: number;
}

export interface IngredientInput {
  name: string;
  amount: number;
  unit: string;
}

export interface CreateRecipeInput {
  slug: string;
  name: string;
  description: string;
  ingredients: IngredientInput[];
  servings: number;
  prepTime: number;
  bakeTime: number;
}
