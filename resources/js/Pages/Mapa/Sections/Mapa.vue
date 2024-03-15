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
    AdicionaCoordenadasMouse(map.value, { ...configsMapa.configuracoesLeaflet, position: 'bottomright' });

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
const zoomIn = () => {
    map.value.zoomIn();
};

const zoomOut = () => {
    map.value.zoomOut();
};
</script>

<template>
    <div>
        <div id="map" class="z-[5] h-[calc(100vh)] max-h-[calc(100vh)]"></div>
        <div class="absolute top-0 left-0 mt-8 ml-8 z-[10]">
            <button @click="zoomIn" class="bg-white px-3 py-2 rounded-md shadow-md mr-2">+</button>
            <button @click="zoomOut" class="bg-white px-3 py-2 rounded-md shadow-md">-</button>
        </div>
    </div>
</template>

<style scoped>

</style>