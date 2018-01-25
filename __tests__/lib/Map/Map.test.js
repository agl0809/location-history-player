import LeafMap from "leaflet";
import * as Map from '../../../src/js/Map/Map';

describe('drawing a map', () => {
    it('should create a map', () => {
        const HEATMAP_CONTAINER_ID = 'any id';
        const CENTER_COORDS = 'any coords';
        const ZOOM_LEVEL = 'any zoom';
        const TILE_LAYER_OPTIONS = {
            attribution: 'any attribution',
            maxZoom: 'any max zoom',
            minZoom: 'any min zoom'
        };
        const URL_TEMPLATE = 'any urlTemplate';
        const mapOptions = {
            CENTER_COORDS,
            ZOOM_LEVEL,
            URL_TEMPLATE,
            TILE_LAYER_OPTIONS
        };

        const MockSetView = {setView: jest.fn()};
        const MockAddTo = {addTo: jest.fn()};
        LeafMap.map = jest.fn(() => MockSetView);
        LeafMap.tileLayer = jest.fn(() => MockAddTo);

        Map.createMap(HEATMAP_CONTAINER_ID, mapOptions);

        expect(LeafMap.map).toBeCalledWith(HEATMAP_CONTAINER_ID);
        expect(MockSetView.setView).toBeCalledWith(CENTER_COORDS, ZOOM_LEVEL);
        expect(LeafMap.tileLayer).toBeCalledWith(URL_TEMPLATE, TILE_LAYER_OPTIONS);
    });

    it('should create a heat layer on the map using the coordenates received', () => {
        const heatOptions = {
            tileOpacity: 'any tileOpacity',
            heatOpacity: 'any heatOpacity',
            radius: 'any radius',
            blur: 'any blur'
        };
        const coords = ['any lat', 'any lon'];
        const mapInstance = {};

        const MockAddTo = {addTo: jest.fn()};
        LeafMap.heatLayer = jest.fn(() => MockAddTo);

        const MockHeatMap = {redraw: jest.fn()};
        MockAddTo.addTo.mockReturnValue(MockHeatMap);

        Map.createHeatMap(mapInstance, coords, heatOptions);

        expect(LeafMap.heatLayer).toBeCalledWith(coords, heatOptions);
        expect(MockAddTo.addTo).toBeCalledWith(mapInstance);
        expect(MockHeatMap.redraw).toBeCalled();
    });
});
