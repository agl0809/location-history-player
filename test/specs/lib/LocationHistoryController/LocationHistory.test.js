import * as LocationHistory from '../../../../src/js/lib/LocationHistoryController/LocationHistory';

let ready_state;
let oldXMLHttpRequest;

function createMockXhr(responseText, READY_STATE) {
    const mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        overrideMimeType: jest.fn(),
        readyState: READY_STATE,
        responseText: responseText
    };

    window.XMLHttpRequest = jest.fn(() => mockXHR);

    return mockXHR;
}

function xmlHttpRequestBackup() {
    oldXMLHttpRequest = window.XMLHttpRequest;
}

function xmlHttpRequestRestore() {
    window.XMLHttpRequest = oldXMLHttpRequest
}

function whenReadFile(fileUrl, xhr) {
    const promise = LocationHistory.readFile(fileUrl);
    xhr.onreadystatechange();

    return promise;
}

describe('reading a file', () => {
    const fileUrl = 'any url';

    beforeEach(function () {
        xmlHttpRequestBackup();
    });

    afterEach(() => {
        xmlHttpRequestRestore();
    });

    it('should return an object with a valid state and the content of a valid json file', (done) => {
        ready_state = 4;
        const fileContent = {key: 'any content'};
        let promise, xhr;

        xhr = createMockXhr(fileContent, ready_state);
        promise = whenReadFile(fileUrl, xhr);

        promise.then((response) => {
            expect(response).toEqual(fileContent);
            done();
        });
    });

    it('should return an error if the file is invalid', (done) => {
        ready_state = 4;
        const xhrError = {error: 'any error'};
        let promise, xhr;

        xhr = createMockXhr(xhrError, ready_state);
        promise = whenReadFile(fileUrl, xhr);

        promise.catch((response) => {
            expect(response).toEqual(xhrError);
            done();
        });
    });
});

describe('parsing the file\'s content', () => {
    it('should return an array of coordinates parsed properly', () => {
        const SCALAR_E7 = 0.0000001;
        const latOne = 1;
        const lonOne = 1;
        const fileContent = '{"locations": [{"latitudeE7": ' + latOne + ',"longitudeE7": ' + lonOne + '}]}';
        const expectedObject = [
            [latOne * SCALAR_E7, lonOne * SCALAR_E7]
        ];
        let response;

        response = LocationHistory.parseCoordenates(fileContent, SCALAR_E7);
        expect(response).toEqual(expectedObject);
    });
});