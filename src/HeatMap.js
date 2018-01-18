import L from 'leaflet';
import 'leaflet.heat';

export default function heatmap() {
    const SCALAR_E7 = 0.0000001;

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

    function parseCoordenates(track) {
        let coordsParsed = [];

        track.locations.forEach((point) => {
            let lat, lon;

            lat = point.latitudeE7 * SCALAR_E7;
            lon = point.longitudeE7 * SCALAR_E7;

            coordsParsed.push([lat, lon]);
        });

        return coordsParsed;
    }

    function createMap(containerId, centerCoords, zoomLevel, urlTemplate, tileLayerOptions) {
        let leafMap = L.map(containerId).setView(centerCoords, zoomLevel);
        L.tileLayer(urlTemplate, tileLayerOptions).addTo(leafMap);

        return leafMap;
    }

    function createHeatMap(mapInstance, coords, heatOptions) {
        const heat = L.heatLayer(coords, heatOptions).addTo(mapInstance);

        heat.redraw();

        return heat;
    }

    return {readFile, parseCoordenates, createMap, createHeatMap}
};