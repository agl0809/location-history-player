import LocationHistoryController from '../../../../src/js/lib/LocationHistoryController/LocationHistoryController';
import * as LocationHistory from '../../../../src/js/lib/LocationHistoryController/LocationHistory';
import {SCALAR_E7} from '../../../../src/helpers/constants';

describe('LocationHistoryController', () => {
    it('should be defined', function () {
        let locationHistoryController;

        locationHistoryController = LocationHistoryController();

        expect(locationHistoryController).toBeDefined();
    })

    it('should read the file content', function () {
        const JSONFileUrl = 'anyURL';
        const fileContent = 'any file content';
        const expectedCoords = [[1, 1]]; //multiple
        let locationHistoryController, coords, mock;

        LocationHistory.readFile = function (JSONFileUrl) {
            return new Promise((resolve, reject) => {
                process.nextTick(
                    () => resolve(fileContent)
                );
            });
        };

        LocationHistory.parseCoordenates = jest.fn().mockReturnValue(expectedCoords);

        locationHistoryController = LocationHistoryController();
        coords = locationHistoryController.getCoordenates(JSONFileUrl);

        expect.assertions(2);

        return LocationHistory.readFile().then((data, coords) => {
            expect(data).toBe(fileContent);
            expect(LocationHistory.parseCoordenates).toBeCalledWith(fileContent, SCALAR_E7);
        });
    });
})
