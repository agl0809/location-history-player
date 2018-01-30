import {timeLineParser} from 'js/timeLineParser';

describe('parsing the file\'s content', () => {
    it('should return an array of coordinates parsed properly', () => {
        const SCALAR_E7 = 0.0000001;
        const latOne = 1;
        const lonOne = 1;
        const fileContent = '[{"latitudeE7": ' + latOne + ',"longitudeE7": ' + lonOne + '}]';
        const expectedObject = [
            [latOne * SCALAR_E7, lonOne * SCALAR_E7]
        ];
        let response;

        response = timeLineParser(fileContent, SCALAR_E7);
        expect(response).toEqual(expectedObject);
    });
});