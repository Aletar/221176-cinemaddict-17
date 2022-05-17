import { FILMS_COUNT_PER_STEP } from '../consts.js';

import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render } from '../render.js';

import SectionFilmDetailView from '../view/section-film-detail-view.js';
import FilmDetailView from '../view/film-detail-view.js';

export default class ContentPresenter {

  #contentContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #contentFilms = [];

  #contentComponent = new ContentView();
  #allFilmsListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #topRatedFilmsListComponent = new FilmsListExtraView();
  #mostCommentedFilmsLinstComponent = new FilmsListExtraView();

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

  #handleShowMoreButtonClick = () => {
    this.#contentFilms
      .slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#contentFilms.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderFilm = (film) => {

    const filmCardView = new FilmCardView(film);
    const sectionFilmDetailView = new SectionFilmDetailView();
    const filmDetailView = new FilmDetailView(film);

    const showPopup = () => {
      document.body.classList.add('hide-overflow');
      const node = this.#contentContainer.appendChild(sectionFilmDetailView.element);
      render(filmDetailView, sectionFilmDetailView.container);

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          // eslint-disable-next-line no-use-before-define
          closePopup();
        }
      };

      const closePopup = () => {
        document.body.classList.remove('hide-overflow');
        this.#contentContainer.removeChild(node);
        document.removeEventListener('keydown', onEscKeyDown);
      };

      filmDetailView.setCloseButtonClickHandler(() => {
        closePopup(node);
      });

      document.addEventListener('keydown', onEscKeyDown);
    };

    render(filmCardView, this.#allFilmsListComponent.container);
    filmCardView.setClickHandler(showPopup);
  };

  #renderContent = () => {

    render(this.#contentComponent, this.#contentContainer);
    render(this.#allFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < Math.min(this.#contentFilms.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#contentFilms[i]);
    }

    if (this.#contentFilms.length > FILMS_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#contentComponent.element);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }

    render(this.#topRatedFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#contentFilms[i]), this.#topRatedFilmsListComponent.container);
    }

    render(this.#mostCommentedFilmsLinstComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#contentFilms[i]), this.#mostCommentedFilmsLinstComponent.container);
    }
  };

}
