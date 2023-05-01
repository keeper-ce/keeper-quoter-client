<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { QuotesList } from '../data/quotes'
import { shuffleArray, } from '../services/utils'
import AnimationQuoteService from "../services/AnimationQuoteService";
import { TIME_FOR_QUOTE_AUTOCHANGE_SHOWING, TIME_FOR_FADE_IN, TIME_FOR_FADE_OUT } from "../config/quote/animation";

/** Пересортированные данные цитат для сессии пользователя */
const quoteBuffer = shuffleArray(QuotesList);

/** @param {{value: number}} quote Номер текущей цитаты */
const quoteIndex = ref(0);

/** @param {{value: boolean}} show Отображение картинки и цитаты или анимация перехода */
const show = ref(false);

/** Текущий объект цитаты, котоырй мы отрисовываем */
let currentQuote = quoteBuffer[quoteIndex.value];

/** Текущий таймер, по которому происходит смена цитат */
let interval: number;

/** Сервис для анимации цитат */
const animationService = new AnimationQuoteService(show, TIME_FOR_FADE_IN, TIME_FOR_FADE_OUT);

/** Чистим таймеры, перед тем как размаунтить компонент страницы */
onBeforeUnmount(() => {
  clearInterval(interval)
  animationService.kill();
});

/** Получить индекс предыдущей цитаты */
const getPrevQuoteIndex = () => quoteIndex.value - 1 < 0 ? quoteBuffer.length - 1 : quoteIndex.value - 1;

/** Получить индекс следующей цитаты */
const getNextQuoteIndex = () => quoteIndex.value + 1 >= quoteBuffer.length ? 0 : quoteIndex.value + 1;

/**
 * Перезапуск таймера смены цитаты.
 */
const restartQuoteChangingTimer = () => {
  clearTimeout(interval);
  // interval = setInterval(nextQuote, TIME_FOR_QUOTE_AUTOCHANGE_SHOWING) 
  interval = setTimeout(() => {
    nextQuote()
  }, TIME_FOR_QUOTE_AUTOCHANGE_SHOWING)
}

/**
 * Переключение на следующую цитату
 */
const nextQuote = async () => {
  restartQuoteChangingTimer();
  await animationService.hide(50);
  quoteIndex.value = getNextQuoteIndex();
  currentQuote = quoteBuffer[quoteIndex.value];
  animationService.show(50);
}

/**
 * Переключение на предыдущую цитату
 */
const prevQuote = async () => {
  restartQuoteChangingTimer();
  await animationService.hide();
  quoteIndex.value = getPrevQuoteIndex();
  currentQuote = quoteBuffer[quoteIndex.value];
  animationService.show(50);

}

/*
 * По дефолту запускаем анимацию, чтобы после загрузки страницы
 * пользователь увидел анимацию подгрузки первой цитаты.
 *
 * Обновляем таймеры, чтобы начала работать автосмена цитат
 */
restartQuoteChangingTimer();
animationService.show();

</script>

<template>
  <main>
    <div class="top">
      <button class="btn" @click="$router.push('/')">На главную</button>
    </div>
    <div class="body" :class="{ show }">
      <div class="body-top">
        <div class="image">
          <img :src="currentQuote.imageUrl" :alt="currentQuote.author" />
        </div>
      </div>

      <div class="text">
        {{ currentQuote.text }}
      </div>
      <div class="author">
        {{ currentQuote.author }}
      </div>
    </div>
    <div class="bottom">
      <button class="btn" @click="prevQuote()">Пред. цитата</button>
      <button class="btn" @click="nextQuote()">След. цитата</button>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.btn {
  font-size: 16px;
  background: none;
  border: none;
  color: var(--color-heading);
  opacity: 0.8;
  cursor: pointer;
}

.btn:hover {
  opacity: 1;
}

main {
  display: grid;
  row-gap: 32px;
  min-height: calc(100vh - 4rem);
  align-items: start;
  grid-template-rows: auto 1fr auto;
}

.top {
  display: grid;
  justify-content: center;

  column-gap: 8px;
}

.body {
  font-family: 'Shantell Sans', cursive;
  display: grid;
  padding: 16px;
  row-gap: 16px;
  opacity: 0;
  transition: opacity 0.7s;
}

.body.show {
  opacity: 1;
}

.body-top {
  display: grid;
  align-content: center;
  justify-content: center;
}

.image {
  display: grid;
  box-shadow: inset 0 0 3px 1px var(--color-background);
}

.image img {
  position: relative;
  max-width: 100%;
  max-height: 60vh;
  filter: sepia(61%);
  margin: auto;
  border-radius: 32px;
  box-shadow: inset 0 0 10px 15px var(--color-background);
}

.image::after {
  content: '';
  position: absolute;
  left: -3px;
  top: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 32px;
  box-shadow: inset 0 0 10px 15px var(--color-background);
}

.text {
  font-size: 18px;
  text-align: center;
  font-style: italic;
}

.author {
  font-size: 24px;
  color: var(--color-heading);
  font-weight: bold;
  text-align: right;
}

.bottom {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
}
</style>
