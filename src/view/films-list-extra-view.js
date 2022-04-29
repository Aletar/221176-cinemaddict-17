import {createElement} from '../render.js';

const createFilmsListExtraTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsListExtraView {
  getTemplate() {
    return createFilmsListExtraTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getContainer() {
    return this.getElement().querySelector('.films-list__container');
  }

  removeElement() {
    this.element = null;
  }
}
