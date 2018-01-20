import Leaflet from "leaflet";
import 'leaflet.heat';

export function createMap(containerId, options) {
    const leafMap = Leaflet.map(containerId).setView(
        options.CENTER_COORDS,
        options.ZOOM_LEVEL
    );

    Leaflet.tileLayer(options.URL_TEMPLATE, options.TILE_LAYER_OPTIONS).addTo(leafMap);

    return leafMap;
}

export function createHeatMap(mapInstance, coords, heatOptions) {
    const heat = Leaflet.heatLayer(coords, heatOptions).addTo(mapInstance);

    heat.redraw();

    return heat;
}