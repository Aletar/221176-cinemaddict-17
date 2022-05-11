import UserRankView from './view/user-rank-view.js';
import MenuView from './view/menu-view.js';
import SortView from './view/sort-view.js';
import FilmsCountView from './view/films-count-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

render(new UserRankView(), siteHeaderElement);
render(new MenuView(), siteMainElement);
render(new SortView(), siteMainElement);

const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, commentsModel);
contentPresenter.init();

render(new FilmsCountView(), siteFooterStatisticsElement);
