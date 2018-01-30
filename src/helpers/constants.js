// Leaflet
export const SCALAR_E7 = 0.0000001;
export const CENTER_COORDS = [37.7657, -122.4469]; //San Francisco, CA
export const ZOOM_LEVEL = 13;
export const TILE_LAYER_OPTIONS = {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.',
    maxZoom: 18,
    minZoom: 2
};
export const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Leaflet.heat
export const HEAT_OPTIONS = {
    tileOpacity: 1,
    heatOpacity: 1,
    radius: 25,
    blur: 15
};

// App
export const JSON_FILE_URL = 'locationhistory.json';
export const LEAFLET_OPTIONS = {CENTER_COORDS, ZOOM_LEVEL, URL_TEMPLATE, TILE_LAYER_OPTIONS};
export const HEATMAP_CONTAINER_ID = 'heatmap-container';
