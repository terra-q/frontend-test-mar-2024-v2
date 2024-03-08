function ZoomInOut(map, window, logMessages=false) {
    window.ZoomInOut = function (direcao) {
        return direcao == 'in' ? map.zoomIn() : map.zoomOut();
    };
    logMessages && console.log("   [CreateMap] Função de zoom adicionada.");
}

export { ZoomInOut };