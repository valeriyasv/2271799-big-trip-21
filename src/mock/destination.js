import { getRandomElement, getRandomPositiveInteger } from './utils';
import { CITIES, DESCRIPTION } from '../const';

const generatePicture = Array.from({length: getRandomPositiveInteger(5, 1)}, () => getRandomElement([{
  src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
  description: `${getRandomElement(CITIES)} description`
}]));

const mockDestination = [
  {
    id: 1,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  },
  {
    id: 2,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  },
  {
    id: 3,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  },
  {
    id: 4,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  },
  {
    id: 5,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  },
  {
    id: 6,
    name: getRandomElement(CITIES),
    description: getRandomElement(DESCRIPTION),
    pictures: generatePicture
  }
];

export { mockDestination };
