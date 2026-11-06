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
  prepTime: string;
  bakeTime: string;
}
