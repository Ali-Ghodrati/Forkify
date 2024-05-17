import * as model from './model';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarkView from './views/bookmarkView';

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

    // Update Results view to mark selected search result
    ResultsView.update(model.getResultPage());
    BookmarkView.update(model.state.bookmarks);

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
    console.log(1);
    ResultsView.renderSpinner();
    console.log(2);

    // Load results
    await model.loadSearchResults(query);
    console.log(3);

    // Render results
    ResultsView.render(model.getResultPage());
    console.log(4);

    // Render initiation pagination
    PaginationView.render(model.state.search);
    console.log(5);
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
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // Update recipe view
  RecipeView.update(model.state.recipe);

  // Render bookmarks
  BookmarkView.render(model.state.bookmarks);
}

function init() {
  RecipeView.addHandlerRender(controlRecipe);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerBtn(controlPagination);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlBookmark);
}
init();
