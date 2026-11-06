import { getRecipes } from "@/lib/api";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <main>
      <h1>My Recipes</h1>

      {recipes.map((recipe: any) => (
        <article key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <p>Prep: {recipe.prepTime}</p>
          <p>Bake: {recipe.bakeTime}</p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient: any) => (
              <li key={ingredient.name}>
                {ingredient.amount}
                {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </main>
  );
}
