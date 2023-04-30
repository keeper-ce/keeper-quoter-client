/**
 * 
 * @param {Array<T>} array
 * @returns {T}
 */
export const getRanomFromArray = (array) => {
    return array[getRandomArrayIndex(array)]
}

/**
 * 
 * @param {Array<unknown>} array
 */
export const getRandomArrayIndex = (array) => {
    return Math.floor(Math.random()*array.length)
}