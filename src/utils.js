import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => array[getRandomInt(0, array.length - 1)];


const getRandomArrayItems = (array, maxCount = 0) => {
  if (maxCount === 0) {
    maxCount = getRandomInt(1, array.length - 1);
  }
  const result = [];
  for(let i = 0; i <= maxCount; i++) {
    result.push(getRandomArrayItem(array));
  }
  return result;
};

const getRandomBoolean = () => Boolean(getRandomInt(0, 1));

const getRandomDate = () => {
  const daysGap = getRandomInt(0, 20000);

  return dayjs('1930-01-01').add(daysGap, 'day').toDate();
};

const runtimeHumanize = (runtimeInMinutes) => dayjs.duration(runtimeInMinutes, 'minutes').humanize(true);

const yearFromDate = (date) => dayjs(date).year();

export { getRandomInt, getRandomArrayItem, getRandomArrayItems, getRandomBoolean, getRandomDate, runtimeHumanize, yearFromDate };
