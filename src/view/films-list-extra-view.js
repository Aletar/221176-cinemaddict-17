import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListExtraTemplate = (header) => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${header}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class FilmsListExtraView extends AbstractView {

  #header = null;

  constructor(header) {
    super();
    this.#header = header;
  }

  get template() {
    return createFilmsListExtraTemplate(this.#header);
  }

  get container() {
    return this.element.querySelector('.films-list__container');
  }
}
