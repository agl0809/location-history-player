import HeatMap from './HeatMap.js';

const READY_STATE = 4;
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

function WhenReadFile(fileUrl) {
    const response = heatMap.readFile(fileUrl);
    return response;
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

        it('should return an object with the file data extracted', (done) => {
            const fileContent = 'any content';
            let promise, xhr;

            xhr = createMockXhr(fileContent, READY_STATE);
            promise = WhenReadFile(fileUrl);
            xhr.onreadystatechange();

            promise.then((response) => {
                expect(response).toEqual(fileContent);
                done();
            });
        });

        it('should return an error if the file is not correct', (done) => {
            const xhrError = {error: 'any error'};
            let promise, xhr;

            xhr = createMockXhr(xhrError, READY_STATE);
            promise = WhenReadFile(fileUrl);
            xhr.onreadystatechange();

            promise.catch((response) => {
                expect(response).toEqual(xhrError);
                done();
            });
        });

        afterEach(() => {
            xmlhttprequestRestore();
        });
    });
});












