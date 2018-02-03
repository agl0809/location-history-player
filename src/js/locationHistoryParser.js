import {SCALAR_E7} from '../helpers/constants';

function _getLagLngCoordinates(coordinates) {
  return coordinates.map(elem =>
    [ //[lat, lng]
      elem.latitudeE7 * SCALAR_E7,
      elem.longitudeE7 * SCALAR_E7
    ]
  );
}

function _getCoordinates(coordinates) {
  return coordinates.locations ?
    _getLagLngCoordinates(coordinates.locations) :
    _getLagLngCoordinates(coordinates);
}

function locationHistoryParser(serviceResponse = '') {
  return _getCoordinates(JSON.parse(serviceResponse));
}

export {locationHistoryParser};