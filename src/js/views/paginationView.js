import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerBtn(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (numPages > 1 && curPage === 1) {
      return this._nextBtn(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._pervBtn(curPage);
    }

    // Other pages
    if (curPage < numPages) {
      return this._pervBtn(curPage) + this._nextBtn(curPage);
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _nextBtn(page) {
    return `
      <button data-goto='${
        page + 1
      }' class="btn--inline pagination__btn pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }

  _pervBtn(page) {
    return `
    <button data-goto='${
      page - 1
    }' class="btn--inline pagination__btn pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page - 1}</span>
    </button>
     `;
  }
}

export default new PaginationView();
