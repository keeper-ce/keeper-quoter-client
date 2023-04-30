<script setup>
import { onBeforeUnmount, ref } from 'vue';
import { QuotesList } from '../data/quotes'
import { getRanomFromArray } from '../services/utils'

const quote = ref(getRanomFromArray(QuotesList));
const show = ref(false);
setTimeout(() => {
    show.value = true;
  }, 0);


const interval = setInterval(() => {
  quote.value = getRanomFromArray(QuotesList.filter((item) => {
    return quote.value !== item;
  }))
  setTimeout(() => {
    show.value = true;
  }, 0);
  setTimeout(() => {
    show.value = false;
  }, 10000);
}, 12000)




onBeforeUnmount(() => {
  // console.log('onBeforeUnmount')
  clearInterval(interval);
})

</script>

<template>
  <main class="container" :class="{ show }">
    <div class="top">
      <div class="image">
        <img :src="quote.imageUrl" :alt="quote.author"/>
      </div>
    </div>

    <div class="text">
      {{ quote.text }}
    </div>
    <div class="author">
      {{ quote.author }}
    </div>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.container {
  font-family: 'Shantell Sans', cursive;
  display: grid;
  padding: 16px;
  row-gap: 16px;
  opacity: 0;
  transition: opacity 2s;
}

.container.show {
  opacity: 1;
}

.top {
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
    color: var(--vt-c-white-soft);
    font-weight:  bold;
    text-align: right;
  }
</style>