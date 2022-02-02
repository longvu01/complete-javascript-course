import View from './View.js';

class SearchView {
  _parentElement = document.querySelector('.search');
  _inputSearch = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._inputSearch.value.trim();
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._inputSearch.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
