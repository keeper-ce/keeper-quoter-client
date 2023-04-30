/**
 * 
 * @param {Array<T>} array
 * @returns {T}
 */
export const getRanomFromArray = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}