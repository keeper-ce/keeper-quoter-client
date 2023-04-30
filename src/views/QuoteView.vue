<script setup>
import { onBeforeUnmount, ref, toRaw } from 'vue';
import { QuotesList } from '../data/quotes'
import { getRanomFromArray, } from '../services/utils'

const quote = ref(getRanomFromArray(QuotesList));
const show = ref(false);
setTimeout(() => {
  show.value = true;
}, 0);

let interval;
let showTimer;
let hideTimer;

onBeforeUnmount(() => {
  clearInterval(interval);
})

const restartTimerS = () => {
  clearInterval(interval);
  clearTimeout(showTimer);
  clearTimeout(hideTimer);
  interval = setInterval(() => {
    quote.value = getRanomFromArray(QuotesList.filter((item) => {
      return quote.value !== item;
    }))
    showTimer = setTimeout(() => {
      show.value = true;
    }, 0);
    hideTimer = setTimeout(() => {
      show.value = false;
    }, 10000);
  }, 12000)
}

const nextQuote = () => {
  show.value = false;
  setTimeout(() => {
    const index = QuotesList.indexOf(toRaw(quote.value));
    const newIndex = index === QuotesList.length - 1 ? 0 : index + 1;
    quote.value = QuotesList[newIndex];
    show.value = true;
    restartTimerS();
  }, 1500);

}

const prevQuote = () => {
  show.value = false;
  setTimeout(() => {
    const index = QuotesList.indexOf(toRaw(quote.value));
    const newIndex = index === 0 ? QuotesList.length - 1 : index - 1;
    quote.value = QuotesList[newIndex];
    show.value = true;
    restartTimerS();
  }, 1500);
}

restartTimerS();

</script>

<template>
  <main>
    <div class="top">
      <button class="btn" @click="$router.push('/')">На главную</button>
    </div>
    <div class="body" :class="{ show }">
      <div class="body-top">
        <div class="image">
          <img :src="quote.imageUrl" :alt="quote.author" />
        </div>
      </div>

      <div class="text">
        {{ quote.text }}
      </div>
      <div class="author">
        {{ quote.author }}
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
  transition: opacity 2s;
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
  /* overflow: hidden; */
  /* border-radius: 32px; */
  box-shadow: inset 0 0 3px 1px var(--color-background);
  /* box-shadow: inset 10px 10px 5px 29px rgba(0,0,0,0.86); */
}

.image img {
  position: relative;
  max-width: 100%;
  max-height: 60vh;
  filter: sepia(61%);
  margin: auto;
  border-radius: 32px;
  box-shadow: inset 0px 0px 10px 15px var(--color-background);
}

.image::after {
  content: '';
  position: absolute;
  left: -3px;
  top: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 32px;
  box-shadow: inset 0px 0px 10px 15px var(--color-background);
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

.bottom  {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
}
</style>