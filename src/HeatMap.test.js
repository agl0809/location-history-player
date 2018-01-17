import HeatMap from './HeatMap.js';

const READY_STATE = 4;
const SCALAR_E7 = 0.0000001;
let heatMap, oldXMLHttpRequest;

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

function xmlhttprequestBackup() {
    oldXMLHttpRequest = window.XMLHttpRequest;
}

function xmlhttprequestRestore() {
    window.XMLHttpRequest = oldXMLHttpRequest
}

function whenReadFile(fileUrl, xhr) {
    const promise = heatMap.readFile(fileUrl);
    xhr.onreadystatechange();

    return promise;
}

describe('HeatMap', () => {

    beforeEach(function () {
        heatMap = HeatMap();
    });

    it('should be defined', () => {
        expect(heatMap).toBeDefined();
    });

    describe('reading a file', () => {
        const fileUrl = 'any url';

        beforeEach(() => {
            xmlhttprequestBackup();
        });

        it('should return an object with the content of a valid json file', (done) => {
            const fileContent = {key: 'any content'};
            let promise, xhr;

            xhr = createMockXhr(fileContent, READY_STATE);
            promise = whenReadFile(fileUrl, xhr);

            promise.then((response) => {
                expect(response).toEqual(fileContent);
                done();
            });
        });

        it('should return an error if the file is invalid', (done) => {
            const xhrError = {error: 'any error'};
            let promise, xhr;

            xhr = createMockXhr(xhrError, READY_STATE);
            promise = whenReadFile(fileUrl, xhr);

            promise.catch((response) => {
                expect(response).toEqual(xhrError);
                done();
            });
        });

        afterEach(() => {
            xmlhttprequestRestore();
        });
    });

    describe('parsing the file\'s content', () => {
        const fileUrl = 'any url';

        beforeEach(() => {
            xmlhttprequestBackup();
        });

        it('should return an array of coordinates parsed properly', (done) => {
            const latOne = 377788014;
            const lonOne = -1224155326;
            const latTwo = 377733334;
            const lonTwo = 377788884;
            const fileContent = {
                "locations": [{
                    "latitudeE7": latOne,
                    "longitudeE7": lonOne
                }, {
                    "latitudeE7": latTwo,
                    "longitudeE7": lonTwo
                }]
            };
            const expectedObject = [
                [latOne * SCALAR_E7, lonOne * SCALAR_E7],
                [latTwo * SCALAR_E7, lonTwo * SCALAR_E7]
            ];
            let xhr, coordsParsed, promise;

            xhr = createMockXhr(fileContent, READY_STATE);
            promise = whenReadFile(fileUrl, xhr);

            promise.then((response) => {
                coordsParsed = heatMap.parseCoordenates(response);
                expect(coordsParsed).toEqual(expectedObject);
                done();
            });

        });
    });

    afterEach(() => {
        xmlhttprequestRestore();
    });
});












