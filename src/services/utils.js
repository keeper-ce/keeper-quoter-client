/**
 * Рандомизация элементов массива по порядку.
 * @param {Array<T>} array
 * @return {Array<T>}
 */
export const shuffleArray = (array) => array
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);
