import View from './View.js';

class AddRecipeView extends View {
	_parentEl = document.querySelector('.upload');

	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.nav__btn--add-recipe');
	_btnClose = document.querySelector('.btn--close-modal');

	constructor() {
		super();
		this._addHandlerModalWindow();
	}

	_toggleWindow() {
		this._overlay.classList.toggle('hidden');
		this._window.classList.toggle('hidden');
	}

	_addHandlerModalWindow() {
		[this._overlay, this._btnOpen, this._btnClose].forEach((el) => {
			el.addEventListener('click', this._toggleWindow.bind(this));
		});
	}

	addHandlerUpload(handler) {
		this._parentEl.addEventListener('submit', function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);
			console.log(data);
			handler();
		});
	}

	_generateMarkup() {}
}

export default new AddRecipeView();
