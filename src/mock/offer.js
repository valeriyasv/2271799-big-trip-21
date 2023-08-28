import { getRandomElement } from './utils';
import { OFFERS } from '../const';

const mockOffers = [
  {
    'id': 1,
    'title': getRandomElement(OFFERS),
    'price': '57'
  },
  {
    'id': 2,
    'title': getRandomElement(OFFERS),
    'price': '200'
  },
  {
    'id': 3,
    'title': getRandomElement(OFFERS),
    'price': '188'
  },
];

export { mockOffers };
