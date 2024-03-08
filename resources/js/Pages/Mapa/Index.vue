<script setup>
import Mapa from '@/Pages/Mapa/Sections/Mapa.vue';

defineProps({
    projeto: {
        type: Object,
        required: true
    }, 
    rasters: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <Mapa :projeto="projeto" :rasters="rasters" />
</template>