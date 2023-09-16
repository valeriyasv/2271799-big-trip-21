const CITIES = [
  'New York',
  'Tokyo',
  'Paris',
  'London',
  'Sydney',
  'Moscow',
  'Istanbul',
  'Mumbai',
  'Cairo',
  'Beijing',
  'Rome',
  'Geneva',
];

const DESCRIPTION = [
  'The mysterious forest was bathed in moonlight, casting long shadows among the ancient trees',
  'As the sun dipped below the horizon, the city came alive with the glow of neon lights and the sounds of laughte',
  'The aroma of freshly baked bread filled the air as I stepped into the cozy bakery on the corner',
  'The waves crashed against the rocky shoreline, creating a soothing melody that echoed through the coastal town',
  'In the heart of the bustling market, I stumbled upon a hidden gem—a quaint bookstore overflowing with old books and dusty shelves',
  'A gentle breeze rustled the leaves in the park, where families picnicked and children played',
  'The city skyline was a mesmerizing sea of skyscrapers, each one reaching for the heavens',
  'I gazed up at the starry night sky, feeling small and insignificant in the vastness of the universe',
  'The rain tapped softly on the windowpane, providing a comforting backdrop to a cozy evening indoors',
  'Amidst the chaos of the carnival, the carousel spun with colorful lights and laughter-filled music'
];

const TYPES = [
  {
    name: 'Taxi',
    img: 'img/icons/taxi.png'
  },
  {
    name: 'Bus',
    img: 'img/icons/bus.png'
  },
  {
    name: 'Train',
    img: 'img/icons/train.png'
  },
  {
    name: 'Ship',
    img: 'img/icons/ship.png'
  },
  {
    name: 'Drive',
    img: 'img/icons/drive.png'
  }
];

const OFFERS = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Upgrade to a business class'
];

const COUNT_POINT = 5;

const SORT_TYPE = {
  DEFAULT: 'default',
  PRICE: 'price',
  TIME: 'time',
};

export { CITIES, DESCRIPTION, TYPES, OFFERS, COUNT_POINT, SORT_TYPE };
