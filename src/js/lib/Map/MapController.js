import * as Map from '../../../../src/js/lib/Map/Map';

function renderHeatMap(options) {
    let map = Map.createMap(options.containerId, options.mapOptions);

    return Map.createHeatMap(map, options.coordinates, options.heatLayerOptions);
}

export default function MapController() {
    return {renderHeatMap}
};