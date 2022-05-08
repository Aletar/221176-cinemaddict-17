import {createElement} from '../render.js';
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
    alternative_title: alternativeTitle,
    total_rating: totalRating,
    poster,
    age_rating: ageRating,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description
  } = film.film_info;

  const writersString = writers.join(', ');
  const actorsString = actors.join(', ');
  const releaseDate = release.date;
  const releaseCountry = release.release_country;
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
            <h3 class="film-details__title">${title}}</h3>
            <p class="film-details__title-original">${alternativeTitle}}</p>
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
      <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>`
  );
};

export default class FilmDetailView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmDetailTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
