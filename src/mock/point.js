import { TYPES, CITIES } from '../const';
import { getRandomElement, getRandomPositiveInteger } from './utils';
import { mockDestination } from './destination';
import { mockOffers } from './offer';
const mockPoint = [
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-05-23T08:30',
    dateTo: '2023-05-23T10:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-08-23T18:00',
    dateTo: '2023-09-19T21:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-10-23T12:50',
    dateTo: '2023-11-19T15:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-12-23T08:00',
    dateTo: '2023-12-28T15:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2024-02-23T18:00',
    dateTo: '2024-04-19T20:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2024-07-23T10:30',
    dateTo: '2024-08-19T17:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  }
];

export { mockPoint };
