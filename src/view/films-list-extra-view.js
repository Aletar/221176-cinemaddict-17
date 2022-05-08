import {createElement} from '../render.js';

const createFilmsListExtraTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsListExtraView {
  #element = null;

  get template() {
    return createFilmsListExtraTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get container() {
    return this.#element.querySelector('.films-list__container');
  }

  removeElement() {
    this.#element = null;
  }
}
