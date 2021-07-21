import { API_KEY, API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
	recipe: {},
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
		console.error(err);
	}
};
