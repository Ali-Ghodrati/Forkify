import { API_URL } from './config';
import { getJson } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export async function loadRecipe(id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);

    const recipe = data.data.recipe;

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
  } catch (err) {
    throw err;
  }
}

export async function loadSearchResults(query) {
  try {
    state.search.query = query;

    const data = await getJson(`${API_URL}/?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
}
