import Leaflet from "leaflet";
import 'leaflet.heat';

function initMap(containerId, options) {
  return Leaflet.map(containerId).setView(
    options.CENTER_COORDS,
    options.ZOOM_LEVEL
  );
}

function updateTileLayer(options, leafMap) {
  Leaflet.tileLayer(options.URL_TEMPLATE, options.TILE_LAYER_OPTIONS).addTo(leafMap);
}

export function createMap(containerId, options) {
  let leafMap;

  leafMap = initMap(containerId, options);

  updateTileLayer(options, leafMap);

  return leafMap;
}

export function createHeatMap(mapInstance, coords, heatOptions) {
  const heat = Leaflet.heatLayer(coords, heatOptions).addTo(mapInstance);

  heat.redraw();

  return heat;
}

