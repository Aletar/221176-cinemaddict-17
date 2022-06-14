const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rateing'
};

const EMOTIONS = {
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png'
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MINOR_SHOW_POPUP: 'MINOR_SHOW_POPUP',
  MAJOR_SHOW_POPUP: 'MAJOR_SHOW_POPUP'
};

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

export { FilterType, SortType, EMOTIONS, FILMS_COUNT_PER_STEP, EXTRA_FILMS_COUNT, UserAction, UpdateType };
