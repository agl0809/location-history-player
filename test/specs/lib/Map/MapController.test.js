import MapController from '../../../../src/js/Map/MapController';
import * as Map from '../../../../src/js/Map/Map';

let mapController;

describe('Map Controller', () => {
    beforeEach(function () {
        mapController = MapController();
    });

    it('should render a heat map using the configuration received', function () {
        const containerId = 'anyID';
        const coordinates = [];
        const mapOptions = {};
        const heatLayerOptions = {};
        const renderHeatMapOptions = {
            containerId,
            coordinates,
            mapOptions,
            heatLayerOptions
        };
        let expectedMap = {};
        let expectedHeatMap = {};
        let heatMap;

        Map.createMap = jest.fn(() => expectedMap);
        Map.createHeatMap = jest.fn(() => expectedHeatMap);

        heatMap = mapController.renderHeatMap(renderHeatMapOptions);

        expect(Map.createMap).toBeCalledWith(
            renderHeatMapOptions.containerId,
            renderHeatMapOptions.mapOptions
        );
        expect(Map.createHeatMap).toBeCalledWith(
            expectedMap,
            renderHeatMapOptions.coordinates,
            renderHeatMapOptions.heatLayerOptions
        );
        expect(heatMap).toBe(expectedHeatMap);
    });
});
