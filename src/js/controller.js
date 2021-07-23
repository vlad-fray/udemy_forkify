import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
	module.hot.accept();
}
///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		// Loading recipe
		await model.loadRecipe(id);

		// Rendering recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	try {
		resultsView.renderSpinner();
		const query = searchView.getQuery();

		if (!query) return;

		// Loading recipes
		await model.loadSearchResults(query);

		// Renderind results
		resultsView.render(model.getSearchResultsPage());

		// Rendering initial pagination buttons
		paginationView.render(model.state.search);
	} catch (err) {
		resultsView.renderError();
	}
};

const controlPagination = function (goToPage) {
	try {
		// Renderind new results
		resultsView.render(model.getSearchResultsPage(goToPage));

		// Rendering new pagination buttons
		paginationView.render(model.state.search);
	} catch (err) {
		resultsView.renderError();
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
};
init();
