import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (numPages > 1 && this._data.page === 1) {
      return `
      <button class="btn--inline pagination__btn pagination__btn--next">
        <span>Page 3</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // Page 1, and there are NO other pages
    if (numPages === 1) {
      return '';
    }

    // Last page
    if (this._data.page === numPages && this._data.page !== 1) {
      return `
      <button class="btn--inline pagination__btn pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page 1</span>
      </button>
       `;
    }

    // Other pages
    if (this._data.page !== numPages && this._data.page !== 1) {
      return `
      <button class="btn--inline pagination__btn pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page 1</span>
      </button>
      <button class="btn--inline pagination__btn pagination__btn--next">
          <span>Page 3</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
    }
  }

  btnHandler() {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;
    });
  }
}

export default new PaginationView();
