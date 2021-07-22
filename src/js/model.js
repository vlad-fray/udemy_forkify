import { API_KEY, API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
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
