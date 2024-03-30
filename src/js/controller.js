import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import RecipeView from './views/recipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

async function controlRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    RecipeView.renderSpinner();

    //Load recipe
    await model.loadRecipe(id);

    //Render recipe
    RecipeView.render(model.state.recipe);
  } catch (err) {
    console.log('hi');
  }
}

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
