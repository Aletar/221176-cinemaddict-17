import AbstractView from '../framework/view/abstract-view.js';
import { humanizeRuntime, yearFromDate } from '../utils.js';

const createFilmCardTemplate = (film) => {

  const {title, runtime, description, poster, total_rating: totalRating, release} = film.film_info;
  const genre = film.film_info.genre[0];
  const runtimeInHoursMinutes = humanizeRuntime(runtime);
  const releaseYear = yearFromDate(release.date);
  const commentsCount = film.comments.length;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${runtimeInHoursMinutes}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${commentsCount} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {

  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get link() {
    return this.element.querySelector('.film-card__link');
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.link.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

}
