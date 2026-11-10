import LoafHeader from "@/components/LoafHeader/LoafHeader";
import { getRecipes } from "@/lib/api";
import styles from "./page.module.css";

export default async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <main className={styles.page}>
      <LoafHeader />

      <div className={styles.recipes}>
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
                <li key={ingredient.id}>
                  {ingredient.amount}
                  {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
