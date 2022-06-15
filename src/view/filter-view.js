import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createFilterItemTemplate = (filter, isSelected, showCount) => {
  const {type, name, count} = filter;
  const activeString = isSelected ? 'main-navigation__item--active' : '';
  const countString = showCount ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="#${type}" data-filter-type="${type}" class="main-navigation__item ${activeString}">${name} ${countString}</a>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, filter.type === currentFilterType, filter.type !== FilterType.ALL))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };

}
