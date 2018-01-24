import locationHistoryController from 'js/locationHistoryController';
import * as service from 'js/service';
import * as timeLineParser from 'js/timeLineParser';
import {SCALAR_E7} from 'helpers/constants';

describe('LocationHistoryController', () => {
    it('should be defined', function () {
        let controller;

        controller = locationHistoryController();

        expect(controller).toBeDefined();
    })

    it('should read the file content', function () {
        const JSONFileUrl = 'anyURL';
        const fileContent = 'any file content';
        const expectedCoords = [[1, 1]]; //multiple
        let controller, coords, mock;

        service = jest.fn().mockReturnValue(
            new Promise((resolve, reject) => {
                process.nextTick(
                    () => resolve(fileContent)
                );
            }));

        timeLineParser = jest.fn().mockReturnValue(expectedCoords);

        controller = locationHistoryController();
        coords = controller.getCoordinates(JSONFileUrl);

        expect.assertions(1);

        return service().then((data, coords) => {
            expect(data).toBe(fileContent);
            //expect(timeLineParser).toBeCalledWith(fileContent, SCALAR_E7);
        });
    });
})
