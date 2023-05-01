/**
 * Сервис для анимации появления и удаления цитаты
 * @constructor
 */
class AnimationQuoteService {

    timeForFadeIn: number;

    /**  */
    timeForFadeOut: number;

    /** Стэйт компонента видимости цитаты*/
    visibilityState;

    /** Таймер текущего действия анимации */
    currentTimer?: number;

    /*
     * Поскольку передаем объект, то по ссылке
     * можем изменять стэйт.
     */
    constructor(visibilityState: any, timeForFadeIn: number, timeForFadeOut: number) {
        this.timeForFadeOut = timeForFadeOut;
        this.timeForFadeIn = timeForFadeIn;
        this.visibilityState = visibilityState;
        this.currentTimer = undefined;
    }

    /**
     * Показать анимацию появления цитаты
     * @return {Promise<void>}
     */
    #fadeIn() {
        return new Promise<void>((resolve) => {
            this.visibilityState.value = true;
            this.currentTimer = setTimeout(() => resolve(), this.timeForFadeIn);
        })
    }

    /**
     * Показать анимацию удаления цитаты
     * @return {Promise<void>}
     */
    #fadeOut() {
        return new Promise<void>((resolve) => {
            this.visibilityState.value = false;
            this.currentTimer = setTimeout(() => resolve(), this.timeForFadeOut);
        })
    }

    /**
     * Задержка. Ожидание
     * @return {Promise<void>}
     */
    #hold(time: number) {
        return new Promise<void>((resolve) => {
            this.currentTimer = setTimeout(() => resolve(), time);
        })
    }

    /**
     * Преждевременный старт нового действия анимации.
     *
     * Ввиду действий пользователя новое действие анимации
     * может начаться прежде, чем закончится старое. Нужно чистить таймер,
     * чтобы не произошел race condition.
     */
    #startNewAction() {
        clearTimeout(this.currentTimer);
    }

    /**
     * Показать цитату
     * @return {Promise<void>}
     */
    async show(delay = 0) {
        this.#startNewAction();
        if (delay) {
            await this.#hold(delay)
        }
        return await this.#fadeIn();
    }

    /**
     * Спрятать предыдущую цитату
     * @return {Promise<void>}
     */
    async hide(delay = 0, delayAfter = 0) {
        this.#startNewAction();
        if (delay) {
            await this.#hold(delay)
        }
        await this.#fadeOut();
        return await this.#hold(delayAfter);
    }

    /**
     * Убить таймер.
     * Если мы анмаунтим компонент, то нужно бы
     * и таймер убить, чтобы анимация не проигрывалась фоном.
     */
    kill = () => this.#startNewAction(); // Мб это лучше запихнуть в деструктор?
}


export default AnimationQuoteService;
