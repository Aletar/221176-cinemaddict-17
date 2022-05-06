import { getRandomArrayItem, getRandomDate } from '../utils.js';
import { FIRST_NAMES, LAST_NAMES, COMMENTS } from './const.js';
import { EMOTIONS } from '../const.js';

const getRandomName = () => `${getRandomArrayItem(FIRST_NAMES)} ${getRandomArrayItem(LAST_NAMES)}`;

export const generateComment = () => ({
  'id': '1',
  'author': getRandomName(),
  'comment':  getRandomArrayItem(COMMENTS),
  'date': getRandomDate('2022-01-01', 120),
  'emotion': getRandomArrayItem(EMOTIONS)
});
