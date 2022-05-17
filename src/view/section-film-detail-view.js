import AbstractView from '../framework/view/abstract-view.js';

const createSectionFilmDetailTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>
  `
);

export default class SectionFilmDetailView extends AbstractView {
  get template() {
    return createSectionFilmDetailTemplate();
  }

  get container() {
    return this.element.querySelector('.film-details__inner');
  }
}
