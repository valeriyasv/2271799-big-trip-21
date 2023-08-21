const getRandomElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomPositiveInteger = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
export {getRandomElement, getRandomPositiveInteger};
