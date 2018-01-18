import {parseCoordenates, createMap, createHeatMap} from 'js/HeatMap.js';
import history from 'assets/history.json';
import {SCALAR_E7, LEAFLET_OPTIONS, HEAT_OPTIONS} from 'helpers/constants.js';

let coords, leafMap;

coords = parseCoordenates(history, SCALAR_E7);
leafMap = createMap(LEAFLET_OPTIONS);
createHeatMap(leafMap, coords, HEAT_OPTIONS);
