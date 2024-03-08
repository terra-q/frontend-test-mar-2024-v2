function GetUserLocation(map) {
    map.locate({setView: true, maxZoom: 16});
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("Você está aqui!").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    }
    map.on('locationfound', onLocationFound);
    function onLocationError(e) {
        alert(e.message);
    }
    map.on('locationerror', onLocationError);
}

export { GetUserLocation };