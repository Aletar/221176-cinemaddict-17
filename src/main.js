import { render } from './framework/render.js';
import UserRankView from './view/user-rank-view.js';
import FilmsCountView from './view/films-count-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const AUTHORIZATION = 'Basic 6yxowuj2MxgJquSu';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

render(new UserRankView(), siteHeaderElement);

const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

contentPresenter.init();
filterPresenter.init();


render(new FilmsCountView(), siteFooterStatisticsElement);
