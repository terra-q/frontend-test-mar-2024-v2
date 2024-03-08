function GetTileLayerByUrl(map, raster, logMessages = false) {
    let urlLayer = raster.xyz_options.url;

    for (let i in map._layers) {
        if (map._layers[i]._url == urlLayer) {
            logMessages && console.log("    [TileLayers.GetTileLayerByUrl] [Aviso] (" + map._layers[i], ") encontrado no mapa.")
            return map._layers[i];
        }
    }
}

export { GetTileLayerByUrl };