const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getRecipes() {
  const response = await fetch(`${API_URL}/api/recipes`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const result = await response.json();

  return result.data;
}

export async function getRecipe(slug: string) {
  const response = await fetch(`${API_URL}/api/recipes/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const result = await response.json();

  return result.data;
}
