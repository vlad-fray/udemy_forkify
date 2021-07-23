import { API_KEY, API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
};

export const loadRecipe = async function (id) {
	try {
		// Loading recipe
		const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			imageUrl: recipe.image_url,
			ingredients: recipe.ingredients,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
		};
	} catch (err) {
		throw err;
	}
};

export const loadSearchResults = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(
			`${API_URL}?search=${query}&key=${API_KEY}`
		);

		state.search.results = data.data.recipes.map((recipe) => {
			return {
				id: recipe.id,
				title: recipe.title,
				publisher: recipe.publisher,
				imageUrl: recipe.image_url,
			};
		});
	} catch (err) {
		throw err;
	}
};

export const getSearchResultsPage = function (
	page = state.search.page
) {
	state.search.page = page;

	const start = (page - 1) * state.search.resultsPerPage;
	const end = page * state.search.resultsPerPage;

	return state.search.results.slice(start, end);
};

export const updateServings = function (
	servingsCount = state.recipe.servings
) {
	state.recipe.ingredients.forEach((ing) => {
		ing.quantity *= servingsCount / state.recipe.servings;
		//newQt = oldQt * serCount / oldSerCount
	});

	state.recipe.servings = servingsCount;
};
