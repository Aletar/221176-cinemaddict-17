import { render, remove, RenderPosition } from '../framework/render.js';
import ContentView from '../view/content-view.js';
import SortView from '../view/sort-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import { SortType, UserAction, UpdateType, FILMS_COUNT_PER_STEP, EXTRA_FILMS_COUNT } from '../const.js';
import { sortByDate, sortByRating, addComment, deleteComment } from '../utils/film.js';
import { filter } from '../utils/filter.js';

export default class ContentPresenter {

  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filterModel = null;

  #allFilmsPresenters = new Map();
  #topRatedFilmsPresenters = new Map();
  #mostCommentedFilmsPresenters = new Map();

  #contentComponent = new ContentView();
  #allFilmsListComponent = new FilmsListView();
  #topRatedFilmsListComponent = new FilmsListExtraView('Top Rated');
  #mostCommentedFilmsListComponent = new FilmsListExtraView('Most commented');

  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  #sortComponent = null;
  #showMoreButtonComponent = null;
  #currentSortType = SortType.DEFAULT;

  constructor(contentContainer, filmsModel, commentsModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#allFilmsPresenters.forEach((presenter) => presenter.resetView());
    this.#topRatedFilmsPresenters.forEach((presenter) => presenter.resetView());
    this.#mostCommentedFilmsPresenters.forEach((presenter) => presenter.resetView());
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredTasks = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredTasks.sort(sortByDate);
      case SortType.RATING:
        return filteredTasks.sort(sortByRating);
    }
    return filteredTasks;
  }

  init = () => {
    this.#renderContent();
  };

  #handleModeChange = () => {
    this.#allFilmsPresenters.forEach((presenter) => presenter.resetPopup());
  };

  #handleViewAction = (actionType, updateType, film, comment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, film);
        break;
      case UserAction.ADD_COMMENT: {
        const newComment = this.#commentsModel.addComment(updateType, comment);
        addComment(film, newComment);
        this.#filmsModel.updateFilm(updateType, film);
        break;
      }
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, comment);
        deleteComment(film, comment);
        this.#filmsModel.updateFilm(updateType, film);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#allFilmsPresenters.get(data.id).init(data);
        this.#topRatedFilmsPresenters.get(data.id).init(data);
        this.#mostCommentedFilmsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
      case UpdateType.MINOR_SHOW_POPUP:
        this.#clearAllFilmsList();
        this.#renderAllFilmsList();
        break;
      case UpdateType.MAJOR:
      case UpdateType.MAJOR_SHOW_POPUP: {
        this.#clearContent();
        this.#renderContent();
        if (updateType === UpdateType.MAJOR_SHOW_POPUP) {
          if (this.#allFilmsPresenters.has(data.id)) {
            this.#allFilmsPresenters.get(data.id).showPopup();
            return;
          }
          if (this.#topRatedFilmsPresenters.has(data.id)) {
            this.#topRatedFilmsPresenters.get(data.id).showPopup();
            return;
          }
          if (this.#mostCommentedFilmsPresenters.has(data.id)) {
            this.#mostCommentedFilmsPresenters.get(data.id).showPopup();
          }
        }
        break;
      }
    }
  };

  #renderFilm = (film, container, presenters) => {
    const filmPresenter = new FilmPresenter(this.#contentContainer, container, this.#handleViewAction, this.#handleModeChange, this.#commentsModel);
    filmPresenter.init(film);
    presenters.set(film.id, filmPresenter);
  };

  #renderFilms = (films, container, presenters) => {
    films.forEach((film) => this.#renderFilm(film, container, presenters));
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmsCount = Math.min(filmCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmsCount, newRenderedFilmsCount);

    this.#renderFilms(films, this.#allFilmsListComponent, this.#allFilmsPresenters);
    this.#renderedFilmsCount = newRenderedFilmsCount;

    if (this.#renderedFilmsCount >= filmCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderShowMoreButtonComponent = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#contentComponent.element);
  };

  #renderAllFilmsList = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, this.#renderedFilmsCount));

    this.#renderFilms(films, this.#allFilmsListComponent, this.#allFilmsPresenters);
    if (filmCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButtonComponent();
    }
  };

  #renderTopRatedFilmsList = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, EXTRA_FILMS_COUNT));

    this.#renderFilms(films, this.#topRatedFilmsListComponent, this.#topRatedFilmsPresenters);
  };

  #renderMostCommentedFilmsList = () => {
    const filmCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmCount, EXTRA_FILMS_COUNT));

    this.#renderFilms(films, this.#mostCommentedFilmsListComponent, this.#mostCommentedFilmsPresenters);
  };

  #clearAllFilmsList = () => {
    this.#allFilmsPresenters.forEach((presenter) => presenter.destroy());
    this.#allFilmsPresenters.clear();
    remove(this.#showMoreButtonComponent);
  };

  #clearTopRatedList = () => {
    this.#topRatedFilmsPresenters.forEach((presenter) => presenter.destroy());
    this.#topRatedFilmsPresenters.clear();
  };

  #clearMostCommendedList = () => {
    this.#mostCommentedFilmsPresenters.forEach((presenter) => presenter.destroy());
    this.#mostCommentedFilmsPresenters.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearAllFilmsList();
    this.#renderAllFilmsList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#contentComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearContent = () => {
    remove(this.#sortComponent);
    this.#clearAllFilmsList();
    remove(this.#showMoreButtonComponent);
    this.#clearTopRatedList();
    this.#clearMostCommendedList();
  };

  #renderContent = () => {
    render(this.#contentComponent, this.#contentContainer);
    this.#renderSort();
    render(this.#allFilmsListComponent, this.#contentComponent.element);
    this.#renderAllFilmsList();
    render(this.#topRatedFilmsListComponent, this.#contentComponent.element);
    this.#renderTopRatedFilmsList();
    render(this.#mostCommentedFilmsListComponent, this.#contentComponent.element);
    this.#renderMostCommentedFilmsList();
  };
}
