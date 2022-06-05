import { getRandomInt, getRandomArrayItem, getRandomArrayItems, getRandomBoolean, getRandomDate } from '../utils.js';
import { TITLES, FIRST_NAMES, LAST_NAMES, DESCRIPTIONS, POSTERS, COUNTRIES, GENRES, COMMENTS } from './consts.js';
import { EMOTIONS } from '../consts.js';
import {nanoid} from 'nanoid';

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

const generateComment = (id) => ({
  'id': id,
  'author': getRandomName(),
  'comment':  getRandomArrayItem(COMMENTS),
  'date': getRandomDate('2022-01-01', 120),
  'emotion': getRandomArrayItem(Object.keys(EMOTIONS))
});

const generateCommentsID = () => {
  const count = getRandomInt(1, 10);
  return Array.from({length: count}, nanoid);
};

const generateFilm = () => ({
  'id': nanoid(),
  'comments': generateCommentsID(),
  'filmInfo': {
    'title': getRandomArrayItem(TITLES),
    'alternativeTitle': getRandomArrayItem(TITLES),
    'totalRating': +`${getRandomInt(1, 9)}.${getRandomInt(0, 9)}`,
    'poster': getRandomArrayItem(POSTERS),
    'ageRating': getRandomInt(0, 18),
    'director': getRandomName(),
    'writers': getRandomNames(),
    'actors': getRandomNames(),
    'release': {
      'date': getRandomDate(),
      'releaseCountry': getRandomArrayItem(COUNTRIES)
    },
    'runtime': getRandomInt(45, 300),
    'genre': getRandomArrayItems(GENRES, 3),
    'description': getDescription(),
  },
  'userDetails': {
    'watchlist': getRandomBoolean(),
    'alreadyWatched': getRandomBoolean(),
    'watchingDate': getRandomDate(),
    'favorite': getRandomBoolean()
  }
});

export { generateFilm, generateComment };
