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
export const HEATMAP_CONTAINER_ID = 'heatmap';

// HeatMap
export const JSON_FILE_URL = 'https://raw.githubusercontent.com/agl0809/timeline-history-heatmap/develop/public/history.json?token=ABfk349jXnABLIk5SYD-QkxyFvh5sK-iks5aa8ihwA%3D%3D';
export const LEAFLET_OPTIONS = {HEATMAP_CONTAINER_ID, CENTER_COORDS, ZOOM_LEVEL, URL_TEMPLATE, TILE_LAYER_OPTIONS};