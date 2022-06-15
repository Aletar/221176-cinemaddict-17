import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeRuntime } from '../utils/date.js';
import { isEnterPressed } from '../utils/common.js';
import { EMOTIONS } from '../const.js';

const getGenresString = (genres) => {
  let result = '';
  for(const genre of genres) {
    result += `<span class="film-details__genre">${genre}</span>`;
  }
  return result;
};

const getSelectedEmotionImg = (emotion) =>
  emotion === null ? '' : `<img src="${EMOTIONS[emotion]}" width="55" height="55" alt="emoji-${emotion}">`;

const createCommentTemplate = (comment) =>
  `<li class="film-details__comment" data-comment-id="${comment.id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;

const createFilmDetailTemplate = (data) => {

  const comments = [];
  for (let i = 0; i < data.comments.length; i++) {
    comments.push(createCommentTemplate(data.comments[i]));
  }
  const commentsString = comments.join('');

  return `<div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${data.poster}" alt="">
        <p class="film-details__age">${data.ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${data.title}</h3>
            <p class="film-details__title-original">${data.alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${data.totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${data.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${data.writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${data.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${data.releaseDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${data.runtimeInHoursMinutes}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${data.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${getGenresString(data.genre)}
            </td>
          </tr>
        </table>
        <p class="film-details__film-description">
          ${data.description}
        </p>
      </div>
    </div>
    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${ data.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${ data.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button ${ data.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.comments.length}</span></h3>
      <ul class="film-details__comments-list">
        ${commentsString}
      </ul>
      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
          ${getSelectedEmotionImg(data.selectedEmotion)}
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${data.commentText}</textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  </div>`;
};

export default class FilmDetailView extends AbstractStatefulView {

  constructor(film, comments) {
    super();
    this._state = FilmDetailView.filmToState(film, comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setAddToFavoritesClickHandler(this._callback.addToFavoritesClick);
    this.setDeleteCommentButtonClickHandler(this._callback.deleteCommentButtonClick);
    this.setCommentPressEnterHandler(this._callback.commentPressEnter);
  };

  static filmToState = (film, comments) => ({
    id: film.id,
    title: film.filmInfo.title,
    alternativeTitle: film.filmInfo.alternativeTitle,
    totalRating: film.filmInfo.totalRating,
    poster: film.filmInfo.poster,
    ageRating: film.filmInfo.ageRating,
    director: film.filmInfo.director,
    writers: film.filmInfo.writers.join(', '),
    actors: film.filmInfo.actors.join(', '),
    releaseDate: film.filmInfo.release.date,
    releaseCountry: film.filmInfo.release.releaseCountry,
    runtime: film.filmInfo.runtime,
    runtimeInHoursMinutes: humanizeRuntime(film.filmInfo.runtime),
    genre: film.filmInfo.genre,
    description: film.filmInfo.description,
    watchlist: film.userDetails.watchlist,
    alreadyWatched: film.userDetails.alreadyWatched,
    watchingDate: film.userDetails.watchingDate,
    favorite: film.userDetails.favorite,
    comments: comments,
    selectedEmotion: 'smile',
    commentText: ''
  });

  static stateToFilm = (state) => ({
    id: state.id,
    filmInfo: {
      title: state.title,
      alternativeTitle: state.alternativeTitle,
      totalRating: state.totalRating,
      poster: state.poster,
      ageRating: state.ageRating,
      director: state.director,
      writers: state.writers.split(', '),
      actors: state.actors.split(', '),
      release: {
        date: state.releaseDate,
        releaseCountry: state.releaseCountry
      },
      runtime: state.runtime,
      genre: state.genre,
      description: state.description
    },
    userDetails: {
      watchlist: state.watchlist,
      alreadyWatched: state.alreadyWatched,
      watchingDate: state.watchingDate,
      favorite: state.favorite
    },
    comments: state.comments.map((comment) => comment.id),
  });

  get closeButton() {
    return this.element.querySelector('.film-details__close-btn');
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((node) => node.addEventListener('click', this.#emotionToggleHandler));

    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  };

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

  #emotionToggleHandler = (evt) => {
    this.updateElement({
      selectedEmotion: evt.target.value
    });
  };

  #commentPressEnterHandler = (evt) => {
    if (isEnterPressed(evt)) {
      evt.preventDefault();
      this._callback.commentPressEnter(FilmDetailView.stateToFilm(this._state), {
        filmID: this._state.id,
        comment: this._state.commentText,
        emotion: this._state.selectedEmotion
      });
    }
  };

  setCommentPressEnterHandler = (callback) => {
    this._callback.commentPressEnter = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#commentPressEnterHandler);
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      commentText: evt.target.value
    });
  };

  #deleteCommentButtonClickHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this._callback.deleteCommentButtonClick(FilmDetailView.stateToFilm(this._state), {
      filmID: this._state.id,
      id: evt.target.parentNode.parentNode.parentNode.dataset.commentId,
    });
  };

  setDeleteCommentButtonClickHandler = (callback) => {
    this._callback.deleteCommentButtonClick = callback;
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteCommentButtonClickHandler);
  };
}
