<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { QuotesList, QuoteRecord } from '../data/quotes'
import { shuffleArray, getPrevIndex, getNextIndex } from '../services/utils'
import AnimationQuoteService from "../services/AnimationQuoteService";
import {
  TIME_FOR_QUOTE_AUTOCHANGE_SHOWING,
  TIME_FOR_FADE_IN,
  TIME_FOR_FADE_OUT,
  TIME_DELAY_BEFORE_QUOTE_CHANGING,
  TIME_DELAY_AFTER_QUOTE_CHANGING
} from "../config/quote/animation";

/** Пересортированные данные цитат для сессии пользователя */
const quoteBuffer = shuffleArray(QuotesList);

/** @param {{value: number}} quote Номер текущей цитаты */
const quoteIndex = ref(0);

/** @param {{value: boolean}} show Отображение картинки и цитаты или анимация перехода */
const show = ref(false);

/** Текущий объект цитаты, котоырй мы отрисовываем */
let currentQuote = ref<QuoteRecord>(quoteBuffer[0]);
// let prevQuote = quoteBuffer[getPrevIndex(quoteIndex.value, QuotesList.length)];
// let nextQuote = quoteBuffer[getNextIndex(quoteIndex.value, QuotesList.length)];

/** Текущий таймер, по которому происходит смена цитат */
let interval: number;

/** Сервис для анимации цитат */
const animationService = new AnimationQuoteService(show, TIME_FOR_FADE_IN, TIME_FOR_FADE_OUT);

/** Чистим таймеры, перед тем как размаунтить компонент страницы */
onBeforeUnmount(() => {
  clearInterval(interval)
  animationService.kill();
});

/**
 * Перезапуск таймера смены цитаты.
 */
const restartQuoteChangingTimer = () => {
  clearTimeout(interval);
  // interval = setInterval(nextQuote, TIME_FOR_QUOTE_AUTOCHANGE_SHOWING) 
  interval = setTimeout(() => {
    onNextQuote()
  }, TIME_FOR_QUOTE_AUTOCHANGE_SHOWING)
}

const updateQuotesState = (newIndex: number) => {
  console.log('new index');
  quoteIndex.value = newIndex;
  currentQuote.value = quoteBuffer[newIndex];
  // prevQuote = quoteBuffer[getPrevIndex(quoteIndex.value, QuotesList.length)];
  // nextQuote = quoteBuffer[getNextIndex(quoteIndex.value, QuotesList.length)];
}

/**
 * Переключение на следующую цитату
 */
const onNextQuote = async () => {
  restartQuoteChangingTimer();
  await animationService.hide(0, TIME_DELAY_BEFORE_QUOTE_CHANGING);
  updateQuotesState(getNextIndex(quoteIndex.value, QuotesList.length))
  animationService.show(TIME_DELAY_AFTER_QUOTE_CHANGING);
}

/**
 * Переключение на предыдущую цитату
 */
const onPrevQuote = async () => {
  restartQuoteChangingTimer();
  await animationService.hide(0, TIME_DELAY_BEFORE_QUOTE_CHANGING);
  updateQuotesState(getPrevIndex(quoteIndex.value, QuotesList.length))
  animationService.show(TIME_DELAY_AFTER_QUOTE_CHANGING);

}

/*
 * По дефолту запускаем анимацию, чтобы после загрузки страницы
 * пользователь увидел анимацию подгрузки первой цитаты.
 *
 * Обновляем таймеры, чтобы начала работать автосмена цитат
 */
// updateQuotesState(quoteIndex.value);
restartQuoteChangingTimer();
animationService.show();

</script>

<template>
  <!-- <link v-for="q in QuotesList" rel="prefetch prerender" :href="q.imageUrl" /> -->
  <!-- <link rel="prefetch prerender" :href="prevQuote.imageUrl" />
  <link rel="prefetch prerender" :href="nextQuote.imageUrl" /> -->
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
      <button class="btn" @click="onPrevQuote()">Пред. цитата</button>
      <button class="btn" @click="onNextQuote()">След. цитата</button>
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
