/**
 * Рандомизация элементов массива по порядку.
 */
export const shuffleArray = <T>(array: Array<T>): T[] => {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export const getPrevIndex = (index: number, length: number) => index - 1 < 0 ? length - 1 : index - 1;

/** Получить индекс следующей цитаты */
export const getNextIndex = (index: number, length: number) => index + 1 >= length ? 0 : index + 1;