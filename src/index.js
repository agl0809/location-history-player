import {HEATMAP_CONTAINER_ID, LEAFLET_OPTIONS, HEAT_OPTIONS, JSON_FILE_URL} from 'helpers/constants';
import {renderHeatMap} from './mapController';
import {getCoordinates} from './locationHistoryController';

export default function start() {
  getCoordinates(JSON_FILE_URL)
  .then((coords) => {
    renderHeatMap(
      {
        containerId: HEATMAP_CONTAINER_ID,
        coordinates: coords,
        mapOptions: LEAFLET_OPTIONS,
        heatLayerOptions: HEAT_OPTIONS
      }
    );
  });
}

start();



