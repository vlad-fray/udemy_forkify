import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
	_parentEl = document.querySelector('.upload');
	_message = 'Recipe was successfully uploaded';

	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.nav__btn--add-recipe');
	_btnClose = document.querySelector('.btn--close-modal');

	constructor() {
		super();
		this._addHandlerModalWindow();
	}

	toggleWindow() {
		this._overlay.classList.toggle('hidden');
		this._window.classList.toggle('hidden');
	}

	_addHandlerModalWindow() {
		[this._overlay, this._btnOpen, this._btnClose].forEach((el) => {
			el.addEventListener('click', this.toggleWindow.bind(this));
		});
	}

	addHandlerUpload(handler) {
		this._parentEl.addEventListener('submit', function (e) {
			e.preventDefault();
			const dataArr = [...new FormData(this)];
			const data = Object.fromEntries(dataArr);
			handler(data);
		});
	}

	renderMessage(message = this._message) {
		const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
		this._clear();
		this._parentEl.insertAdjacentHTML('afterbegin', markup);
	}
}

export default new AddRecipeView();
