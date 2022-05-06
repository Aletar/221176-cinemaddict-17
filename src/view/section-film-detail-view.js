import {createElement} from '../render.js';

const createSectionFilmDetailTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>
  `
);

export default class SectionFilmDetailView {
  getTemplate() {
    return createSectionFilmDetailTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getContainer() {
    return this.getElement().querySelector('.film-details__inner');
  }

  removeElement() {
    this.element = null;
  }
}
