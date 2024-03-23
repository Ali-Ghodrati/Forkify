const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

async function loadRecipe(id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    const recipe = data.data.recipe;

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(recipe);

    const newRecipe = {
      id: recipe.id,
      image: recipe.image_url,
      source: recipe.source_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      title: recipe.title,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };

    console.log(newRecipe);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener('hashchange', function () {
  const id = location.hash.slice(1);
  loadRecipe(id);
});
