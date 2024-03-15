import dayjs from 'dayjs'; // Importa a biblioteca day.js para formatação de data e hora
import { ZoomInOut } from './Zoom/ZoomInOut.js';

let logMessages = false;

function ConfigsLeaflet(configs) {
    return {
        zoomControl: configs.configuracoesLeaflet.zoomControl,
        zoomSnap: configs.configuracoesLeaflet.zoomSnap,
        zoomDelta: configs.configuracoesLeaflet.zoomDelta,
        minZoom: configs.zoom.min,
        maxZoom: configs.zoom.max,
    };
}

function AdicionaCoordenadasMouse(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);

    let mousePosControl = L.control.mousePosition({
        position: "bottomleft",
        emptyString: "Coordenadas indisponíveis",
        formatter: function (lng, lat) {
            let pt = projCRS.project(L.latLng(lat, lng));
            let dateTime = dayjs().format('DD/MM/YYYY HH:mm:ss'); // Obtém a data e hora formatadas
            let coordsText;
            if (sistema == 'utm') {
                coordsText = `${pt.y.toFixed(0)} N : ${pt.x.toFixed(0)} E<br><b>DATA/HORA:</b> ${dateTime}`;
            } else {
                coordsText = `Lat.: ${pt.y.toFixed(5)} | Lon.: ${pt.x.toFixed(5)}<br> ${dateTime}`;
            }
            return coordsText;
        }
    });
    
    map.addControl(mousePosControl);

    // Aplicar estilos CSS ao componente de coordenadas do mouse
    let controlContainer = mousePosControl.getContainer();
    controlContainer.style.fontSize = "18px"; 
    controlContainer.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; 
    controlContainer.style.padding = "10px";
    controlContainer.style.borderRadius = "5px";

    logMessages && console.log("   [CreateMap] Coordenadas do mouse adicionada ao mapa.");
}


function AdicionaEscala(map, largura = 150, posicao = "bottomright") {
    let escala = L.control.scale({
        position: posicao,
        metric: true,
        imperial: false,
        maxWidth: largura,
    }).addTo(map);
    logMessages && console.log("   [CreateMap] Escala adicionada ao mapa.");
}

function FuncaoVisaoInicial(map, x, y, z) {
    window.SetaVisaoInicial = function () {
        return map.setView([y, x], z);
    };
    logMessages && console.log("   [CreateMap] Função de resetar para visão inicial adicionada.");
}

function FuncoesZoom(map) {
    ZoomInOut(map, window, logMessages);
}

function AdicionaAttribution(map, textoAttribution) {
    map.attributionControl.setPrefix(textoAttribution);
    logMessages && console.log("   [CreateMap] Attribution adicionado ao mapa.");
}

function CriaMenuContexto(map, configuracoesLeaflet) {
    let crs = configuracoesLeaflet.crs;
    let sistema = configuracoesLeaflet.sistema;
    let proj4text = configuracoesLeaflet.proj4text;
    let projCRS = new L.Proj.CRS(crs, proj4text);
    let popup = L.popup();

    map.on("contextmenu", (e) => {
        let coordenada = projCRS.project(L.latLng(e.latlng.lat, e.latlng.lng));
        let dateTime = dayjs().format('DD/MM/YYYY HH:mm:ss'); // Obtém a data e hora formatadas
        let content = "";
        if (sistema == 'utm') {
            content = "<div style='margin-bottom: 10px;'><b>N</b>: " + coordenada.y.toFixed(0) + "<br><b>E</b>: " + coordenada.x.toFixed(0) + "</div>";
        } else {
            content = "<div><b>Lat.</b>: " + coordenada.y.toFixed(5) + "</div><div style='margin-top: 10px;'><b>Lon.</b>: " + coordenada.x.toFixed(5) + "</div>";
        }
        content += "<div style='margin-top: 10px;'><b>Data/Hora:</b> " + dateTime + "</div>"; // Adiciona a data/hora ao conteúdo do popup

        popup.setLatLng(e.latlng).setContent(content).openOn(map);
    });
    logMessages && console.log("   [CreateMap] Menu de contexto adicionado ao mapa.");
}


function FuncaoMapaInformacoes(mapa) {
    window.MapaInformacoes = function () {
        let zoom = mapa.getZoom();
        let centro = mapa.getCenter();
        let bounds = mapa.getBounds();
        let informacoes = {
            zoom: zoom,
            centro: centro,
            bounds: bounds,
            xyz: {
                x: centro.lng,
                y: centro.lat,
                z: zoom
            }
        };
        let userInput = prompt("Digite as coordenadas em ordem 'latitude longitude'\n\nSepare as coordenadas por espaço.\n\nEx:\n-23.123456 -46.123456");
        let userInputText = userInput.split(" ");
        let userInputLat = parseFloat(userInputText[0]);
        let userInputLng = parseFloat(userInputText[1]);
        let markerIcon = L.icon({
            iconUrl: '/maps/icons/marker-icon.png',
            shadowUrl: '/maps/icons/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });
        let marker = L.marker([userInputLat, userInputLng], { icon: markerIcon }).addTo(mapa);
        mapa.setView([userInputLat, userInputLng], 15);
        return informacoes;
    };
    logMessages && console.log(mapa);
}

export {
    ConfigsLeaflet,
    AdicionaCoordenadasMouse,
    AdicionaEscala,
    FuncaoVisaoInicial,
    FuncoesZoom,
    AdicionaAttribution,
    CriaMenuContexto,
    FuncaoMapaInformacoes
};
