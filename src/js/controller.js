import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';

// https://forkify-api.herokuapp.com/v2

async function controlRecipe() {
  try {
    // Get id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spinner
    RecipeView.renderSpinner();

    // Update Results view to mark selected search result
    ResultsView.update(model.getResultPage());

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
  // Render new results
  ResultsView.render(model.getResultPage(goToPage));

  // Render new pagination
  PaginationView.render(model.state.search);
}

function controlServings(newServings) {
  // Update the recipe servings (in model)
  model.updateServings(newServings);

  // Update the recipe view
  RecipeView.update(model.state.recipe);
}

function controlBookmark() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
}

function init() {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
}
init();
