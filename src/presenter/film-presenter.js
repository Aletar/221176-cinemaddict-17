import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import SectionFilmDetailView from '../view/section-film-detail-view.js';
import FilmDetailView from '../view/film-detail-view.js';
import { isEscapePressed } from '../utils/common.js';
import { UpdateType, UserAction } from '../const.js';
import { Mode } from '../utils/film.js';

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

  #commentsModel = null;
  #comments = null;

  constructor(contentContainer, filmsListContainer, changeData, changeMode, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#film = film;
    this.#comments = this.#commentsModel.commentsByIDs(this.#film.id, this.#film.comments);

    this.#sectionFilmDetailView = new SectionFilmDetailView();

    const prevFilmCardView = this.#filmCardView;
    const prevFilmDetailView = this.#filmDetailView;

    this.#filmCardView = new FilmCardView(this.#film);
    this.#filmDetailView = new FilmDetailView(this.#film, this.#comments);

    this.#filmCardView.setClickHandler(this.#handleFilmClick);

    this.#filmCardView.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmCardView.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardView.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    this.#filmDetailView.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick);
    this.#filmDetailView.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmDetailView.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClick);

    if (this.#mode === Mode.DEFAULT) {
      render(this.#filmCardView, this.#filmsListContainer.container);
      return;
    }

    replace(this.#filmCardView, prevFilmCardView);
    if (this.#mode === Mode.DETAIL) {
      replace(this.#filmDetailView, prevFilmDetailView);
      this.#filmDetailView.setCommentPressEnterHandler(this.#handleCommentPressEnter);
      this.#filmDetailView.setDeleteCommentButtonClickHandler(this.#handleDeleteCommentButtonClick);
      this.#filmDetailView.setCloseButtonClickHandler(() => this.#closePopup());
    }

    remove(prevFilmCardView);
    remove(prevFilmDetailView);

  };

  resetPopup = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  };

  showPopup = () => {
    document.body.classList.add('hide-overflow');
    this.#node = this.#contentContainer.appendChild(this.#sectionFilmDetailView.element);
    render(this.#filmDetailView, this.#sectionFilmDetailView.container);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#filmDetailView.setCloseButtonClickHandler(() => this.#closePopup());
    this.#filmDetailView.setCommentPressEnterHandler(this.#handleCommentPressEnter);
    this.#filmDetailView.setDeleteCommentButtonClickHandler(this.#handleDeleteCommentButtonClick);
    this.#changeMode();
    this.#mode = Mode.DETAIL;
  };

  #handleFilmClick = () => {
    this.showPopup();
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
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#mode === Mode.DETAIL ? UpdateType.MAJOR_SHOW_POPUP : UpdateType.MAJOR,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}},
      null
    );
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#mode === Mode.DETAIL ? UpdateType.MAJOR_SHOW_POPUP : UpdateType.MAJOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}},
      null
    );
  };

  #handleAddToFavoritesClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#mode === Mode.DETAIL ? UpdateType.MAJOR_SHOW_POPUP : UpdateType.MAJOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}},
      null
    );
  };


  #handleCommentPressEnter = (film, comment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      film,
      comment
    );
  };

  #handleDeleteCommentButtonClick = (film, comment) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      film,
      comment
    );
  };

  destroy = () => {
    remove(this.#filmCardView);
    remove(this.#filmDetailView);
  };
}
