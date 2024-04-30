import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';

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
    ResultsView.render(model.getResultPage());

    // Render initiation pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    ResultsView.renderError();
  }
}

function controlPagination(goToPage) {
  // Update state
  model.state.search.page = goToPage;

  // Render results
  ResultsView.render(model.getResultPage(goToPage));

  // Render initiation pagination
  PaginationView.render(model.state.search);
}

function init() {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlPagination);
}
init();
