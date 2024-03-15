<template>
    <div class="bg-black min-h-screen flex justify-center items-center">
      <Grafico :dados="dadosGrafico" />
    </div>
  </template>
  
  <script setup>
  import Grafico from '@/Pages/Grafico/Sections/Grafico.vue';
  
  defineProps({
    dadosGrafico: {
      type: Object,
      required: true
    }
  });
  </script>
  