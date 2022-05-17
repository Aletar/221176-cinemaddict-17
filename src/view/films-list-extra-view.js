import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListExtraTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsListExtraView extends AbstractView {
  get template() {
    return createFilmsListExtraTemplate();
  }

  get container() {
    return this.element.querySelector('.films-list__container');
  }
}
