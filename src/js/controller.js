import * as model from './model.js';
import recipeView from './view/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './view/recipeView.js';

// https://forkify-api.herokuapp.com/v2

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
		console.error(err);
	}
};

// controlRecipes();

// Event handlers

['hashchange', 'load'].forEach((event) =>
	window.addEventListener(event, controlRecipes)
);
