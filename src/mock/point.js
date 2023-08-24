import { TYPES } from '../const';
import { getRandomElement, getRandomPositiveInteger } from './utils';
import { mockDestination } from './destination';
import { mockOffers } from './offer';

const mockPoint = [
  {
    id: 1,
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    destination: mockDestination[getRandomPositiveInteger(1, 6)],
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers))
  },
  {
    id: 2,
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    destination: mockDestination[getRandomPositiveInteger(0, 2)],
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers))
  },
  {
    id: 3,
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    destination: mockDestination[getRandomPositiveInteger(0, 2)],
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers))
  }
];

export { mockPoint };
