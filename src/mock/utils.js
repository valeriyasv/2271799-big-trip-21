import dayjs from 'dayjs';

const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomPositiveInteger = (max = 100, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const updateItem = (items, updated) => items.map((item) => item.id === updated.id ? updated : item);

function getDifferenceInMinutes(start, end) {
  return dayjs(end).diff(dayjs(start), 'minute');
}

export {getRandomElement, getRandomPositiveInteger, updateItem, getDifferenceInMinutes};
