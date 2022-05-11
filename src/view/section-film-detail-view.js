import {createElement} from '../render.js';

const createSectionFilmDetailTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>
  `
);

export default class SectionFilmDetailView {
  #element = null;

  get template() {
    return createSectionFilmDetailTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get container() {
    return this.#element.querySelector('.film-details__inner');
  }

  removeElement() {
    this.#element = null;
  }
}
