import {getCoordinates} from 'js/locationHistoryController';
import * as serviceDep from 'js/service';
import * as parserDep from 'js/locationHistoryParser'
import {SCALAR_E7} from 'helpers/constants';

describe('locationHistoryController', () => {
    it('should read the file content', function () {
        const fileContent = 'any file content';
        const JSONFileUrl = 'anyURL';
        const expectedCoords = [['any coordinates pair']];
        let promise;

        serviceDep.service = jest.fn(() => {
            return new Promise((resolve, reject) => {
                process.nextTick(
                    () => resolve(fileContent)
                );
            });
        });

        parserDep.locationHistoryParser = jest.fn(() => expectedCoords);

        promise = getCoordinates(JSONFileUrl);

        expect.assertions(2);

        return promise.then((data) => {
            expect(serviceDep.service).toBeCalledWith(JSONFileUrl);
            expect(parserDep.locationHistoryParser).toBeCalledWith(fileContent, SCALAR_E7);
        });
    });
})
