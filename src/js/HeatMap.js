import Leaflet from 'leaflet';
import 'leaflet.heat';

function readFile(fileUrl) {
    const locationUrl = fileUrl;

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', locationUrl, true);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                const resp = request.responseText;
                if (resp.error) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
                request.send(null);
            }
        };
    });
}

function parseCoordenates(track, SCALAR_E7) {
    let coordsParsed = [];

    track.locations.forEach((point) => {
        let lat, lon;

        lat = point.latitudeE7 * SCALAR_E7;
        lon = point.longitudeE7 * SCALAR_E7;

        coordsParsed.push([lat, lon]);
    });

    return coordsParsed;
}

function createMap(options) {
    let leafMap = Leaflet.map(options.HEATMAP_CONTAINER_ID).setView(options.CENTER_COORDS, options.ZOOM_LEVEL);
    Leaflet.tileLayer(options.URL_TEMPLATE, options.TILE_LAYER_OPTIONS).addTo(leafMap);

    return leafMap;
}

function createHeatMap(mapInstance, coords, heatOptions) {
    const heat = Leaflet.heatLayer(coords, heatOptions).addTo(mapInstance);

    heat.redraw();

    return heat;
}

export {readFile, parseCoordenates, createMap, createHeatMap};