import {readFile, parseCoordenates, createMap, createHeatMap} from 'js/HeatMap.js';
import {SCALAR_E7, LEAFLET_OPTIONS, HEAT_OPTIONS, JSON_FILE_URL} from 'helpers/constants.js';

let coords, leafMap, promise;

promise = readFile(JSON_FILE_URL);

promise.then((history) => {
    coords = parseCoordenates(history, SCALAR_E7);
    leafMap = createMap(LEAFLET_OPTIONS);
    createHeatMap(leafMap, coords, HEAT_OPTIONS);
});

