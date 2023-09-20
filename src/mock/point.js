import { TYPES, CITIES } from '../const';
import { getRandomElement, getRandomPositiveInteger } from './utils';
import { mockDestination } from './destination';
import { mockOffers } from './offer';
const mockPoint = [
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-25T08:30',
    dateTo: '2023-09-25T10:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-25T12:00',
    dateTo: '2023-09-25T15:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-28T18:00',
    dateTo: '2023-09-28T20:00',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-26T09:00',
    dateTo: '2023-09-26T14:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-26T15:00',
    dateTo: '2023-09-26T17:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: false,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  },
  {
    id: crypto.randomUUID(),
    price: getRandomPositiveInteger(),
    dateFrom: '2023-09-27T19:30',
    dateTo: '2023-09-28T21:30',
    name: getRandomElement(CITIES),
    destination: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockDestination)),
    isFavorite: true,
    type: getRandomElement(TYPES),
    offers: Array.from({ length: getRandomPositiveInteger(1, 5) }, () => getRandomElement(mockOffers)),
  }
];

export { mockPoint };
