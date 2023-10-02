import dayjs from 'dayjs';
import { FilterTypes } from '../const';

const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomPositiveInteger = (max = 100, min = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const updateItem = (items, updated) => items.map((item) => item.id === updated.id ? updated : item);

function getDifferenceInMinutes(start, end) {
  return dayjs(end).diff(dayjs(start), 'minute');
}

function isPointFuture(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPointPast(point) {
  return dayjs().isAfter(point.dateTo);
}

function isPointPresent(point) {
  return dayjs().isBefore(point.dateTo) && dayjs().isAfter(point.dateFrom);
}

const filterType = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export {getRandomElement, getRandomPositiveInteger, updateItem, getDifferenceInMinutes, filterType};
