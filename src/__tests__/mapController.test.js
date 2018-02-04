import {renderHeatMap} from '../mapController';
import * as Map from '../map';

describe('Map Controller', () => {

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

    heatMap = renderHeatMap(renderHeatMapOptions);

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
