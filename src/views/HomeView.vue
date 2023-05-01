<script setup lang="ts">
import Header from '../components/Header.vue';
import { version } from '../../package.json';

const v = version;

</script>

<template>
  <Header></Header>
  <main>
    <h1>В Разработке</h1>
    <p>Версия: {{ v }}</p>
  </main>
</template>