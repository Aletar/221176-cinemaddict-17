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
  #topRatedFilmsListComponent = new FilmsListExtraView();
  #mostCommentedFilmsLinstComponent = new FilmsListExtraView();

  constructor(contentContainer, filmsModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init() {

    this.#contentFilms = [...this.#filmsModel.films];

    this.#renderContent();

  }

  #renderFilm(film) {

    const filmCardView = new FilmCardView(film);
    const sectionFilmDetailView = new SectionFilmDetailView();
    const filmDetailView = new FilmDetailView(film);

    const closePopup = (node) => {
      document.body.classList.remove('hide-overflow');
      this.#contentContainer.removeChild(node);
    };

    const onEscKeyDown = (evt, node) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup(node);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const showPopup = () => {
      document.body.classList.add('hide-overflow');
      const node = this.#contentContainer.appendChild(sectionFilmDetailView.element);
      render(filmDetailView, sectionFilmDetailView.container);

      filmDetailView.closeButton.addEventListener('click', () => {
        closePopup(node);
      });

      document.addEventListener('keydown', (evt) => onEscKeyDown(evt, node));
    };

    render(filmCardView, this.#allFilmsListComponent.container);
    filmCardView.link.addEventListener('click', showPopup);

  }

  #renderContent() {

    render(this.#contentComponent, this.#contentContainer);

    render(this.#allFilmsListComponent, this.#contentComponent.element);
    this.#contentFilms.forEach((film) => this.#renderFilm(film));

    render(new ShowMoreButtonView(), this.#contentComponent.element);

    render(this.#topRatedFilmsListComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#contentFilms[i]), this.#topRatedFilmsListComponent.container);
    }

    render(this.#mostCommentedFilmsLinstComponent, this.#contentComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(this.#contentFilms[i]), this.#mostCommentedFilmsLinstComponent.container);
    }
  }

}
