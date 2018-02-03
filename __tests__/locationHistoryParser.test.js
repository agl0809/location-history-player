import {locationHistoryParser} from 'js/locationHistoryParser';

describe('parsing a service response', () => {

  describe('retrieving a valid string containing an array of objects', function () {
    it('should return an array of coordinates parsed properly', () => {
      const SCALAR_E7 = 0.0000001;
      const latOne = 1;
      const lonOne = 1;
      const fileContent = '[{"latitudeE7": ' + latOne + ',"longitudeE7": ' + lonOne + '}]';
      const expectedObject = [[latOne * SCALAR_E7, lonOne * SCALAR_E7]];

      const response = locationHistoryParser(fileContent);

      expect(response).toEqual(expectedObject);
    });
  });

  describe('retrieving a valid string containing an object with locations key', function () {
    it('should return an array of coordinates parsed properly', () => {
      const SCALAR_E7 = 0.0000001;
      const latOne = 1;
      const lonOne = 1;
      const fileContent = '{"locations": [{"latitudeE7": ' + latOne + ',' +
        '"longitudeE7": ' + lonOne + '}]}';
      const expectedObject = [[latOne * SCALAR_E7, lonOne * SCALAR_E7]];

      const response = locationHistoryParser(fileContent, SCALAR_E7);

      expect(response).toEqual(expectedObject);
    });
  });
});