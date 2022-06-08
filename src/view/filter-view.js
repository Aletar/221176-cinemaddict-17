import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isSelected, showCount) => {
  const {name, presentation, count} = filter;
  const activeString = isSelected ? 'main-navigation__item--active' : '';
  const countString = showCount ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="#${name}" class="main-navigation__item ${activeString}">${presentation} ${countString}</a>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0, index !== 0))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
