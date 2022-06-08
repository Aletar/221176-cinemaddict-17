import { render } from './framework/render.js';
import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import FilmsCountView from './view/films-count-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { generateFilter } from './mock/data.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filters = generateFilter(filmsModel.films);

render(new UserRankView(), siteHeaderElement);
render(new FilterView(filters), siteMainElement);

const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, commentsModel);
contentPresenter.init();

render(new FilmsCountView(), siteFooterStatisticsElement);
