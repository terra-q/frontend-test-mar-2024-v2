import { TileLayerLoad } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js';

function AdicionaOverlaysPadrao(map, rasters, logMessages=false) {
    rasters.forEach(raster => {
        if (raster.tipo == 'overlay' && raster.xyz_options.enabled == true) {
            TileLayerLoad(map, raster.nome, raster.xyz_options.url, raster.xyz_options);
            logMessages && console.log("    [TileLayers.AdicionaOverlaysPadrao] [SUCESSO] (" + raster.nome + ")");
        }
    });
}

export { AdicionaOverlaysPadrao };