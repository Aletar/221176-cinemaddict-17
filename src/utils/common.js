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

const isEscapePressed = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const isEnterPressed = (evt) => (evt.key === 'Enter');

export { getRandomInt, getRandomArrayItem, getRandomArrayItems, getRandomBoolean, isEscapePressed, isEnterPressed };
