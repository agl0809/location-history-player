import HeatMap from './HeatMap';

let heatMap, response, coords, leafMap;

/* Mocking file reading */
const latOne = 377788014;
const lonOne = -1224155326;
const latTwo = 377733334;
const lonTwo = 377788884;
response = {
    "locations": [{
        "latitudeE7": latOne,
        "longitudeE7": lonOne
    }, {
        "latitudeE7": latTwo,
        "longitudeE7": lonTwo
    }]
};
/* end Mocking file reading */

const HEAT_OPTIONS = {
    tileOpacity: 1,
    heatOpacity: 1,
    radius: 25,
    blur: 15
};
const HEATMAP_CONTAINER_ID = 'heatmap';
const CENTER_COORDS = [0, 0];
const ZOOM_LEVEL = 2;
const TILE_LAYER_OPTIONS = {
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors.',
    maxZoom: 18,
    minZoom: 2
};
const URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

heatMap = HeatMap();
coords = heatMap.parseCoordenates(response);
leafMap = heatMap.createMap(HEATMAP_CONTAINER_ID, CENTER_COORDS, ZOOM_LEVEL, URL_TEMPLATE, TILE_LAYER_OPTIONS);
heatMap.createHeatMap(leafMap, coords, HEAT_OPTIONS);
