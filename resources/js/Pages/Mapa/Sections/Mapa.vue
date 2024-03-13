<script setup>
import { ref, onMounted } from 'vue';

import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'proj4';
import 'proj4leaflet';
import 'leaflet-mouse-position';
import 'leaflet.vectorgrid';

import {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes,
    FuncoesZoom 
} from '@/Pages/Mapa/Functions/InicializarMapa.js';

import { AdicionaBasemapPadrao } from '@/Pages/Mapa/Functions/TileLayers/AdicionaBasemapPadrao.js';
import { AdicionaOverlaysPadrao } from '@/Pages/Mapa/Functions/TileLayers/AdicionaOverlaysPadrao.js';
import { ToggleRasterTile } from '@/Pages/Mapa/Functions/TileLayers/ToggleRasterTile.js';

const props = defineProps({
    projeto: Object,
    rasters: Object
});

let configsMapa = props.projeto.mapa.configuracao;

let rasters = props.projeto.rasters;

let map = ref(null);

onMounted(() => {
    let configs = ConfigsLeaflet(configsMapa);
    
    map.value = L.map('map', configs);

    FuncaoVisaoInicial(map.value, configsMapa.visaoInicial.x, configsMapa.visaoInicial.y, configsMapa.visaoInicial.z);

    SetaVisaoInicial();

    FuncoesZoom(map.value);

    FuncaoMapaInformacoes(map.value);
    
    // Adiciona as coordenadas do mouse no canto inferior esquerdo do mapa
    AdicionaCoordenadasMouse(map.value, { ...configsMapa.configuracoesLeaflet, position: 'bottomleft' });

    map.value.doubleClickZoom.disable();

    // Adiciona escala ao mapa
    configsMapa.funcionalidades.escala ? AdicionaEscala(map.value) : configsMapa.funcionalidades.escala;

    // Adiciona atribuições (fonte de dados) ao mapa
    configsMapa.funcionalidades.atribuicoes ? AdicionaAttribution(map.value, configsMapa.configuracoesLeaflet.atribuicaoPrefixo) : map.value.attributionControl.remove();

    // Cria menu de contexto (clique direito com coordenadas)
    configsMapa.funcionalidades.menuContexto ? CriaMenuContexto(map.value, configsMapa.configuracoesLeaflet) : configsMapa.funcionalidades.menuContexto;

    // Adiciona o basemap padrão do mapa (TileLayers)
    AdicionaBasemapPadrao(map.value, rasters);

    // Adiciona os overlays (TileLayers)
    AdicionaOverlaysPadrao(map.value, rasters);

    // Cria a função "ToggleRaster" para alternar a visualização dos overlays
    window.ToggleRaster = function (nomeRaster) {
        rasters.forEach(raster => raster.nome == nomeRaster ? ToggleRasterTile(map.value, raster) : null);
    };
});
</script>

<template>
    <div id="map" class="z-[5] h-[calc(100vh)] max-h-[calc(100vh)]"></div>
</template>

<style scoped>
/* Estilos para o componente de coordenadas do mouse */
.leaflet-control-mouseposition {
    font-size: 16px; /* Aumenta o tamanho da fonte */
    background-color: rgba(255, 255, 255, 0.5); /* Define o fundo branco com opacidade */
    position: absolute; /* Fixa o componente */
    bottom: 10px; /* Define a distância do fundo da tela */
    left: 10px; /* Define a distância da borda esquerda da tela */
    padding: 5px; /* Adiciona um espaço ao redor do texto */
    border-radius: 5px; /* Adiciona bordas arredondadas */
}

.leaflet-popup-content {
    padding-top: 10px; /* Adicione espaçamento acima do conteúdo do popup */
    padding-bottom: 10px; /* Adicione espaçamento abaixo do conteúdo do popup */
}
</style>
