import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import RecipeView from './views/recipeView';

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

function init() {
  RecipeView.addHandlerRender(controlRecipe);
}
init();
