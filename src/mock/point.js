import { TYPES, CITIES } from '../const';
import { getRandomElement, getRandomPositiveInteger } from './utils';
import { mockDestination } from './destination';
import { mockOffers } from './offer';
const mockPoint = [
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23',
    dateTo: '2023-12-19',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  }
];

export { mockPoint };
