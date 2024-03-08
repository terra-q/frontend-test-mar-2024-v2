<script setup>
import Grafico from '@/Pages/Grafico/Sections/Grafico.vue';

defineProps({
    dadosGrafico: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <Grafico :dados="dadosGrafico" />
</template>