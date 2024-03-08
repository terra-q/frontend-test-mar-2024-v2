import { TileLayerLoad } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoad.js';
import { TileLayerLoadWMS } from '@/Pages/Mapa/Functions/TileLayers/TileLayerLoadWMS.js';
import { TileLayerRemove } from '@/Pages/Mapa/Functions/TileLayers/TileLayerRemove.js';
import { GetTileLayerByUrl } from '@/Pages/Mapa/Functions/TileLayers/GetTileLayerByUrl.js';

function ToggleRasterTile(map, raster, logMessages = false) {
    var rasterLayer = GetTileLayerByUrl(map, raster, logMessages);

    if (rasterLayer == undefined) {
        if (raster.tipo == 'overlay') {
            TileLayerLoad(map, raster.nome, raster.xyz_options.url, raster.xyz_options, logMessages=false)
        } else if (raster.tipo == 'wms') {
            TileLayerLoadWMS(map, raster.nome, raster.xyz_options.url, raster.xyz_options, logMessages=false)
        }
    } else {
        TileLayerRemove(map, raster, logMessages);
    }
};

export { ToggleRasterTile };