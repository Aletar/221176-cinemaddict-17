import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import SectionFilmDetailView from '../view/section-film-detail-view.js';
import FilmDetailView from '../view/film-detail-view.js';
import { isEscapePressed } from '../utils.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAIL: 'DETAIL'
};

export default class FilmPresenter {

  #contentContainer = null;
  #filmsListContainer = null;

  #changeData = null;
  #changeMode = null;

  #filmCardView = null;
  #sectionFilmDetailView = null;
  #filmDetailView = null;
  #film = null;
  #mode = Mode.DEFAULT;

  #node = null;

  constructor(contentContainer, filmsListContainer, changeData, changeMode) {
    this.#contentContainer = contentContainer;
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;

    this.#sectionFilmDetailView = new SectionFilmDetailView();

    const prevFilmCardView = this.#filmCardView;
    const prevFilmDetailView = this.#filmDetailView;

    this.#filmCardView = new FilmCardView(this.#film);
    this.#filmDetailView = new FilmDetailView(this.#film);

    this.#filmCardView.setClickHandler(this.#handleFilmClick);

    this.#filmCardView.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmCardView.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardView.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    this.#filmDetailView.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmDetailView.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmDetailView.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    if (prevFilmCardView === null) {
      render(this.#filmCardView, this.#filmsListContainer.container);
      return;
    }

    replace(this.#filmCardView, prevFilmCardView);
    if (this.#mode === Mode.DETAIL) {
      replace(this.#filmDetailView, prevFilmDetailView);
    }

    remove(prevFilmCardView);
    remove(prevFilmDetailView);

  };

  resetPopup = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  };

  #handleFilmClick = () => {
    document.body.classList.add('hide-overflow');
    this.#node = this.#contentContainer.appendChild(this.#sectionFilmDetailView.element);
    render(this.#filmDetailView, this.#sectionFilmDetailView.container);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#filmDetailView.setCloseButtonClickHandler(() => this.#closePopup());
    this.#changeMode();
    this.#mode = Mode.DETAIL;
  };

  #closePopup = () => {
    document.body.classList.remove('hide-overflow');
    this.#contentContainer.removeChild(this.#node);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapePressed(evt)) {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #handleAddToWatchlistClick = () => {
    this.#changeData({...this.#film, userDetail: {...this.#film.detailInfo, watchlist: !this.#film.userDetails.watchlist}});
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#film, userDetail: {...this.#film.detailInfo, alreadyWatched: !this.#film.userDetails.alreadyWatched}});
  };

  #handleAddToFavoritesClick = () => {
    this.#changeData({...this.#film, userDetail: {...this.#film.detailInfo, favorite: !this.#film.userDetails.favorite}});
  };

  destroy = () => {
    remove(this.#filmCardView);
    remove(this.#filmDetailView);
  };
}