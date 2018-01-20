import {createMap, createHeatMap} from 'js/HeatMap.js';
import {SCALAR_E7, LEAFLET_OPTIONS, HEAT_OPTIONS, JSON_FILE_URL} from 'helpers/constants.js';
import LocationHistoryController from 'js/lib/LocationHistoryController/LocationHistoryController.js';

LocationHistoryController().getCoordenates(JSON_FILE_URL)
    .then((coords) => {
        const leafMap = createMap(LEAFLET_OPTIONS);
        createHeatMap(leafMap, coords, HEAT_OPTIONS);
    });



