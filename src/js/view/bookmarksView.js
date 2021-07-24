import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
	_parentEl = document.querySelector('.bookmarks__list');
	_message = '';
	_errorMessage =
		'No bookmarks yet. Find a nice recipe and bookmark it :)';

	_generateMarkup() {
		return this._data
			.map((bookmark) => previewView.render(bookmark, false))
			.join('');
	}
}

export default new BookmarksView();
