import ContentView from '../view/content-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListExtraView from '../view/films-list-extra-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render } from '../render.js';

export default class ContentPresenter {
  contentComponent = new ContentView();
  allFilmsListComponent = new FilmsListView();
  topRatedFilmsListComponent = new FilmsListExtraView();
  mostCommentedFilmsLinstComponent = new FilmsListExtraView();

  init = (contentContainer) => {
    this.contentContainer = contentContainer;
    render(this.contentComponent, this.contentContainer);

    render(this.allFilmsListComponent, this.contentComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.allFilmsListComponent.getContainer());
    }

    render(new ShowMoreButtonView(), this.contentComponent.getElement());

    render(this.topRatedFilmsListComponent, this.contentComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.topRatedFilmsListComponent.getContainer());
    }

    render(this.mostCommentedFilmsLinstComponent, this.contentComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.mostCommentedFilmsLinstComponent.getContainer());
    }
  };
}

