import { FilterType } from '../const.js';

const filter = {
  [FilterType.ALL]: {presentation: 'All movies', func: (films) => films},
  [FilterType.WATCHLIST]: {presentation: 'Watchlist', func: (films) => films.filter((film) => film.userDetails.watchlist)},
  [FilterType.HISTORY]: {presentation: 'History', func: (films) => films.filter((film) => film.userDetails.alreadyWatched)},
  [FilterType.FAVORITES]: {presentation: 'Favorites', func: (films) => films.filter((film) => film.userDetails.favorite)},
};

export {filter};
