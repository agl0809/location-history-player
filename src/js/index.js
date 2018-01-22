import {HEATMAP_CONTAINER_ID, LEAFLET_OPTIONS, HEAT_OPTIONS, JSON_FILE_URL} from 'js/constants.js';
import LocationHistoryController from 'js/LocationHistoryController.js';
import MapController from 'js/Map/MapController.js';

LocationHistoryController().getCoordinates(JSON_FILE_URL)
    .then((coords) => {
        MapController().renderHeatMap(
            {
                containerId: HEATMAP_CONTAINER_ID,
                coordinates: coords,
                mapOptions: LEAFLET_OPTIONS,
                heatLayerOptions: HEAT_OPTIONS
            }
        );
    });



