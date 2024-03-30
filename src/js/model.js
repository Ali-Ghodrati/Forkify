export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    const recipe = data.data.recipe;

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      source: recipe.source_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      title: recipe.title,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };

    console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
}
