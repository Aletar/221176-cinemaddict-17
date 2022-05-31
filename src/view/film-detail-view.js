import AbstractView from '../framework/view/abstract-view.js';
import { humanizeRuntime } from '../utils.js';

const getGenresString = (genres) => {
  let result = '';
  for(const genre of genres) {
    result += `<span class="film-details__genre">${genre}</span>`;
  }
  return result;
};

const createFilmDetailTemplate = (film) => {

  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description
  } = film.filmInfo;

  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  const writersString = writers.join(', ');
  const actorsString = actors.join(', ');
  const releaseDate = release.date;
  const releaseCountry = release.releaseCountry;
  const runtimeInHoursMinutes = humanizeRuntime(runtime);

  return (
    `<div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${writersString}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${actorsString}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${releaseDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${runtimeInHoursMinutes}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${getGenresString(genre)}
            </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${ watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${ alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${ favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>`
  );
};

export default class FilmDetailView extends AbstractView {

  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmDetailTemplate(this.#film);
  }

  get closeButton() {
    return this.element.querySelector('.film-details__close-btn');
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.closeButton.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  };

  #addToFavoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  };

}
