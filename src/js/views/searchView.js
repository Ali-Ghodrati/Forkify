import icons from 'url:../../img/icons.svg';

class SearchView {
  _parentEl = document.querySelector('.search');
  btn = document.querySelector('.search__btn');
  _data;
  _errorMessage = 'We could not find that query. Please try another one!';
  _message = '';

  getQuery() {
    return this._parentEl.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault;
      handler();
    });
  }
}

export default new SearchView();
