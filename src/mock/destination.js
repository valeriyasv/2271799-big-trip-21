import { getRandomElement } from './utils';
import { CITIES, DESCRIPTION } from './const';

const createDestination = () => ({
  id: crypto.randomUUID(),
  name: getRandomElement(CITIES),
  description: DESCRIPTION,
  pictures: [
    {
      'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      'description': `${getRandomElement(CITIES)} description`
    }
  ]
});

export { createDestination };
