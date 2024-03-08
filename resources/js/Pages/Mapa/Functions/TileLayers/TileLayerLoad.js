
function TileLayerLoad(map, nomeLayer, url, options, logMessages=false) {

    if (map.getPane(nomeLayer) != undefined) {
        logMessages && console.log("    [TileLayers.Load] [Aviso] (" + nomeLayer, ") já existe no mapa.")
        return false;
    }

    function loadingTileLayer(e) {
        let spinner = document.getElementById("Spinner " + nomeLayer);
        spinner != undefined ? spinner.classList.remove("hidden") : null;
        logMessages && console.log("    [TileLayers.Load.loadingTileLayer] [Carregando..] (" + nomeLayer + ")");
    }

    function loadedTileLayer(e) {
        let spinner = document.getElementById("Spinner " + nomeLayer);
        spinner != undefined ? spinner.classList.add("hidden") : null;
        logMessages && console.log("    [TileLayers.Load.loadedTileLayer] [SUCESSO] (" + nomeLayer + ")");
    }
    
    let tileLayer = L.tileLayer(url, options)
        .on('loading', loadingTileLayer)
        .on('load', loadedTileLayer)
        .addTo(map);
};

export { TileLayerLoad };