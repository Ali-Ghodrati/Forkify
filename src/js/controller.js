import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';

// https://forkify-api.herokuapp.com/v2

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    RecipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = SearchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (err) {
    console.log(err);
  }
}

function init() {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
}
init();
