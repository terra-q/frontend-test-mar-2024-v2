<template>
    <div class="bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white p-4 rounded-lg shadow-md">
        <canvas ref="chartCanvas" width="400" height="300"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

// Definindo as propriedades recebidas pelo componente
const props = defineProps({
    dados: Object
});

// Referência para o elemento canvas do gráfico
const chartCanvas = ref(null);

// Variável para armazenar o objeto Chart
let myChart = null;

// Efeito para renderizar o gráfico quando o componente é montado
onMounted(() => {
    // Renderizar o gráfico ao montar o componente
    if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar', // Alterando o tipo de gráfico de precipitação para um gráfico de barras
            data: props.dados, // Utiliza os dados fornecidos
            options: {
                responsive: false, // Desabilitando responsividade para manter o tamanho fixo
                scales: {
                    y: {
                        beginAtZero: true // Começar o eixo y no zero
                    }
                }
            }
        });

        // Alterando o tipo de gráfico de temperatura para um gráfico de linhas
        myChart.data.datasets[1].type = 'line';
        myChart.update();
    }
});
</script>

<style>
/* Estilos opcionais para o gráfico */
</style>
