import * as Map from './map';

function renderHeatMap(options) {
  let map = Map.createMap(options.containerId, options.mapOptions);

  return Map.createHeatMap(map, options.coordinates, options.heatLayerOptions);
}

export {renderHeatMap};