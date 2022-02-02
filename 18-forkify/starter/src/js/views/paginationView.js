import View from './View.js';

import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = +this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Only 1 page
    if (numPages <= 1) {
      return '';
    }

    // Page 1 and others
    if (curPage === 1) {
      return this._generateMarkupBtn(curPage, 'next');
    }

    // Last page
    if (curPage === numPages) {
      return this._generateMarkupBtn(curPage, 'prev');
    }

    // Other pages
    if (curPage < numPages) {
      return this._generateMarkupBtn(curPage, 'prev').concat(
        this._generateMarkupBtn(curPage, 'next')
      );
    }

    return '';
  }

  _generateMarkupBtn(curPage, status) {
    const page = status === 'prev' ? +curPage - 1 : +curPage + 1;
    const direction = status === 'prev' ? 'left' : 'right';
    return `
    <button data-goto="${page}" class="btn--inline pagination__btn--${status}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
    `;
  }

  addHandlerClick(handle) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = btn.dataset.goto;

      handle(goToPage);
    });
  }
}

export default new PaginationView();
