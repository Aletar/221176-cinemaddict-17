import { getRandomInt, getRandomArrayItem, getRandomArrayItems, getRandomBoolean, getRandomDate } from '../utils.js';
import { TITLES, FIRST_NAMES, LAST_NAMES, DESCRIPTIONS, POSTERS, COUNTRIES, GENRES, COMMENTS } from './consts.js';
import { EMOTIONS } from '../consts.js';

const getRandomName = () => `${getRandomArrayItem(FIRST_NAMES)} ${getRandomArrayItem(LAST_NAMES)}`;

const getRandomNames = (maxCount = 0) => {
  if (maxCount === 0) {
    maxCount = getRandomInt(1, 5);
  }

  const result = [];
  for(let i = 0; i <= maxCount; i++) {
    result.push(getRandomName());
  }

  return result;
};

const getDescription = () => getRandomArrayItems(DESCRIPTIONS, 3).join(' ');

const generateFilm = () => ({
  'id': '0',
  'comments': [
    1, 2
  ],
  'film_info': {
    'title': getRandomArrayItem(TITLES),
    'alternative_title': getRandomArrayItem(TITLES),
    'total_rating': +`${getRandomInt(1, 9)}.${getRandomInt(0, 9)}`,
    'poster': getRandomArrayItem(POSTERS),
    'age_rating': getRandomInt(0, 18),
    'director': getRandomName(),
    'writers': getRandomNames(),
    'actors': getRandomNames(),
    'release': {
      'date': getRandomDate(),
      'release_country': getRandomArrayItem(COUNTRIES)
    },
    'runtime': getRandomInt(45, 300),
    'genre': getRandomArrayItems(GENRES, 3),
    'description': getDescription(),
  },
  'user_details': {
    'watchlist': getRandomBoolean(),
    'already_watched': getRandomBoolean(),
    'watching_date': getRandomDate(),
    'favorite': getRandomBoolean()
  }
});

const generateComment = () => ({
  'id': '1',
  'author': getRandomName(),
  'comment':  getRandomArrayItem(COMMENTS),
  'date': getRandomDate('2022-01-01', 120),
  'emotion': getRandomArrayItem(EMOTIONS)
});

export { generateFilm, generateComment };
