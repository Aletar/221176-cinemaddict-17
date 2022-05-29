import { render, remove } from '../framework/render.js';
import { FILMS_COUNT_PER_STEP } from '../consts.js';
import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import { updateItem } from '../utils.js';

export default class ContentPresenter {

  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #contentFilms = [];

  #filmPresenter = new Map();

  #contentComponent = new ContentView();
  #allFilmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #topRatedFilmsListComponent = new FilmsListExtraView();
  #mostCommentedFilmsListComponent = new FilmsListExtraView();

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor(contentContainer, filmsModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#contentFilms = [...this.#filmsModel.films];
    this.#renderContent();
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetPopup());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#contentFilms = updateItem(this.#contentFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #renderFilm = (film, container) => {
    const filmPresenter = new FilmPresenter(this.#contentContainer, container, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #handleShowMoreButtonClick = () => {
    this.#contentFilms
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film, this.#allFilmsListComponent));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#contentFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderAllFilmsList = () => {
    render(this.#allFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < Math.min(this.#contentFilms.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#contentFilms[i], this.#allFilmsListComponent);
    }
    if (this.#contentFilms.length > FILMS_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#contentComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderTopRatedFilmsList = () => {
    render(this.#topRatedFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#contentFilms[i], this.#topRatedFilmsListComponent);
    }
  };

  #renderMostCommentedFilmsList = () => {
    render(this.#mostCommentedFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      this.#renderFilm(this.#contentFilms[i], this.#mostCommentedFilmsListComponent);
    }
  };

  #renderContent = () => {
    render(this.#contentComponent, this.#contentContainer);
    this.#renderAllFilmsList();
    this.#renderTopRatedFilmsList();
    this.#renderMostCommentedFilmsList();
  };
}
