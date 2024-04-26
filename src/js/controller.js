import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

async function controlRecipe() {
  try {
    // Get id
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
    // Get query
    const query = SearchView.getQuery();
    if (!query) return;

    // Render spinner
    ResultsView.renderSpinner();

    // Load results
    await model.loadSearchResults(query);

    // Render results
    ResultsView.render(model.getResultPage(1));

    // Render initiation pagination

    PaginationView.render(model.state.search);
  } catch (err) {
    ResultsView.renderError();
  }
}

function init() {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
}
init();
