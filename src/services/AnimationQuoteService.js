import {
    TIME_FOR_FADE_IN,
    TIME_FOR_FADE_OUT,
    TIME_FOR_QUOTE_CHANGING,
} from "../config/quote/animation";

/**
 * Сервис для анимации появления и удаления цитаты
 * @constructor
 */
class AnimationQuoteService {
    /** Стэйт компонента видимости цитаты*/
    visibilityState;

    /** Таймер текущего действия анимации */
    currentTimer;

    /*
     * Поскольку передаем объект, то по ссылке
     * можем изменять стэйт.
     */
    constructor(quoteVisibilityState) {
        this.visibilityState = quoteVisibilityState;
        this.currentTimer = undefined;
    }

    /**
     * Показать анимацию появления цитаты
     * @return {Promise<void>}
     */
    #fadeIn() {
        return new Promise((resolve) => {
            this.visibilityState.value = true;
            this.currentTimer = setTimeout(() => resolve(), TIME_FOR_FADE_IN);
        })
    }

    /**
     * Показать анимацию удаления цитаты
     * @return {Promise<void>}
     */
    #fadeOut() {
        return new Promise((resolve) => {
            this.visibilityState.value = false;
            this.currentTimer = setTimeout(() => resolve(), TIME_FOR_FADE_OUT);
        })
    }

    /**
     * Задержка. Ожидание
     * @return {Promise<void>}
     */
    #hold(time) {
        return new Promise((resolve) => {
            this.currentTimer = setTimeout(() => resolve(), time);
        })
    }

    /**
     * Преждевременный старт нового действия анимации.
     *
     * Ввиду действий пользователя может новое действие анимации
     * может начаться прежде, чем закончится старое. Нужно чистить таймер,
     * чтобы не произошел race condition.
     */
    #startNewAction() {
        clearTimeout(this.currentTimer);
    }

    /**
     * Полный цикл анимации цитаты
     * @return {Promise<void>}
     */
    async show() {
        this.#startNewAction();
        await this.#fadeIn();
    }

    /**
     * Спрятать предыдущую цитату
     * @return {Promise<void>}
     */
    async hide() {
        this.#startNewAction();
        await this.#fadeOut();
        await this.#hold(TIME_FOR_QUOTE_CHANGING);
    }

    /**
     * Убить таймер.
     * Если мы анмаунтим компонент, то нужно бы
     * и таймер убить, чтобы анимация не проигрывалась фоном.
     */
    kill = () => this.#startNewAction(); // Мб это лучше запихнуть в деструктор?
}


export default AnimationQuoteService;
