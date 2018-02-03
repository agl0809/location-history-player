import {HEATMAP_CONTAINER_ID, LEAFLET_OPTIONS, HEAT_OPTIONS, JSON_FILE_URL} from 'helpers/constants';
import start from 'js/index';
import * as locationHistoryController from 'js/locationHistoryController';
import * as MapController from 'js/mapController';

describe('running up the app', () => {
  it('spec name', () => {
    const coordsResponse = [['any coordinates pair']];
    const expectedMapOptions = {
      containerId: HEATMAP_CONTAINER_ID,
      coordinates: coordsResponse,
      mapOptions: LEAFLET_OPTIONS,
      heatLayerOptions: HEAT_OPTIONS
    };

    locationHistoryController.getCoordinates = jest.fn(() =>
      new Promise((resolve) => {
        process.nextTick(
          () => resolve(coordsResponse)
        );
      })
    );

    MapController.renderHeatMap = jest.fn();

    start();

    expect(locationHistoryController.getCoordinates).toBeCalledWith(JSON_FILE_URL);
    return locationHistoryController.getCoordinates(JSON_FILE_URL).then(() => {
      expect(MapController.renderHeatMap).toBeCalledWith(expectedMapOptions);
    });
  });
});