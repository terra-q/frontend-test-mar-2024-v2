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
    // Objeto com as configurações do Leaflet para criação do objeto map
    let configs = ConfigsLeaflet(configsMapa);
    
    // Cria o objeto map do Leaflet
    map = L.map('map', configs);

    // Adiciona a função "SetaVisaoInicial" de resetar a visão inicial do mapa
    FuncaoVisaoInicial(map, configsMapa.visaoInicial.x, configsMapa.visaoInicial.y, configsMapa.visaoInicial.z);

    // Seta a visualização inicial do mapa
    SetaVisaoInicial();

    // Adiciona as funções de zoom do mapa
    FuncoesZoom(map);

    // Adiciona a função "MapaInformacoes" para mostrar as informações do mapa
    FuncaoMapaInformacoes(map);
    
    // Adiciona as coordenadas do mouse no canto inferior direito do mapa
    configsMapa.funcionalidades.coordenadasMouse ? AdicionaCoordenadasMouse(map, configsMapa.configuracoesLeaflet) : configsMapa.funcionalidades.coordenadasMouse;

    // Desabilitar o clique-duplo para função de zoom (nativa do Leaflet)
    map.doubleClickZoom.disable();

    // Adiciona escala ao mapa caso configsMapa.funcionalidades.escala seja true
    configsMapa.funcionalidades.escala ? AdicionaEscala(map) : configsMapa.funcionalidades.escala;

    // Adiciona atribuições (fonte de dados) ao mapa    
    configsMapa.funcionalidades.atribuicoes ? AdicionaAttribution(map, configsMapa.configuracoesLeaflet.atribuicaoPrefixo) : map.attributionControl.remove();
    
    // Desativa o clique do botão direito para evitar menu de contexto do navegador e cria o menu de contexto (clique direito com coordenadas)
    configsMapa.funcionalidades.menuContexto ? CriaMenuContexto(map, configsMapa.configuracoesLeaflet) : configsMapa.funcionalidades.menuContexto;

    // Adiciona o basemap padrão do mapa (TileLayers)
    AdicionaBasemapPadrao(map, rasters);

    // Adiciona os overlays (TileLayers)
    AdicionaOverlaysPadrao(map, rasters);

    // Cria a função "ToggleRaster" para alternar a visualização dos overlays
    window.ToggleRaster = function (nomeRaster) {
        rasters.forEach(raster => raster.nome == nomeRaster ? ToggleRasterTile(map, raster) : null);
    };
});
</script>

<template>
    <div id="map" class="z-[5] h-[calc(100vh)] max-h-[calc(100vh)]"></div>
</template>