import { async } from 'regenerator-runtime';

export const state = {
	recipe: {},
};

export const loadRecipe = async function (id) {
	try {
		// Loading recipe
		const response = await fetch(
			`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=520756b4-44fd-4524-8cc4-ba772ee185af`
		);
		const data = await response.json();
		if (!response.ok)
			throw new Error(`${data.message} ${response.status}`);
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
