import { TileLayerLoad } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js';

function AdicionaBasemapPadrao(map, rasters, logMessages=false) {
    rasters.forEach(raster => {
        if (raster.tipo == 'basemap') {
            TileLayerLoad(map, raster.nome, raster.xyz_options.url, raster.xyz_options);
            logMessages && console.log("    [TileLayers.CarregaBasemapPadrao] [SUCESSO] (" + raster.nome + ")");
            return true;
        }
    });
    return false;
}

export { AdicionaBasemapPadrao };