import { getRandomInt } from './common.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getRandomDate = (startDate = '1930-01-01', maxDaysGap = 40000) => {
  const daysGap = getRandomInt(0, maxDaysGap);

  return dayjs(startDate).add(daysGap, 'day').toDate();
};

const humanizeRuntime = (runtimeInMinutes) => dayjs.duration(runtimeInMinutes, 'minutes').humanize(true);
const humanizeDate = (date) => dayjs(date).humanize(true);
const yearFromDate = (date) => dayjs(date).year();

export { getRandomDate, humanizeRuntime, humanizeDate, yearFromDate };
