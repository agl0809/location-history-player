import locationHistoryController from 'js/locationHistoryController';
import * as serve from 'js/service';
import * as parser from 'js/timeLineParser'
import {SCALAR_E7} from 'helpers/constants';

describe('LocationHistoryController', () => {

    it('should read the file content', function () {
        const fileContent = 'any file content';
        const JSONFileUrl = 'anyURL';
        const expectedCoords = [[1, 1]]; //multiple
        let controller, timeLineParser, promise;

        serve.service = jest.fn(() => {
            return new Promise((resolve, reject) => {
                process.nextTick(
                    () => resolve(fileContent)
                );
            });
        });

        parser.timeLineParser = jest.fn(() => expectedCoords);

        controller = locationHistoryController();
        promise = controller.getCoordinates(JSONFileUrl);

        expect.assertions(2);

        /*return serve.service().then((data) => {
            expect(parser.timeLineParser).toBeCalledWith(fileContent, SCALAR_E7);
        });*/

        return promise.then((data) => {
            expect(serve.service).toBeCalledWith(JSONFileUrl);
            expect(parser.timeLineParser).toBeCalledWith(fileContent, SCALAR_E7);
        });
    });
})
