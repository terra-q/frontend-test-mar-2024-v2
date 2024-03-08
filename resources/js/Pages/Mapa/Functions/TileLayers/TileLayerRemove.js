import { GetTileLayerByUrl } from '@/Pages/Mapa/Functions/TileLayers/GetTileLayerByUrl.js';

function TileLayerRemove(map, raster, logMessages=false) {
    let _tileLayer = GetTileLayerByUrl(map, raster, logMessages);
    if (map.hasLayer(_tileLayer) == undefined) {
        logMessages && console.log("    [TileLayers.Remove] [Aviso] (" + _tileLayer, ") não existe no mapa.")
        return false;
    } else {
        map.removeLayer(_tileLayer);
        logMessages && console.log("    [TileLayers.Remove] [Aviso] (" + _tileLayer, ") removido do mapa.")
    }
};

export { TileLayerRemove };