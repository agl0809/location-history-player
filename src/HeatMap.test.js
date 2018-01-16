import HeatMap from './HeatMap.js';

let heatMap, oldXMLHttpRequest, mockXHR;

function createMockXHR(responseText) {
    mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        overrideMimeType: jest.fn(),
        readyState: 4,
        responseText: responseText
    };

    window.XMLHttpRequest = jest.fn(() => mockXHR);
}

function xmlhttprequestBackup() {
    oldXMLHttpRequest = window.XMLHttpRequest;
}

function xmlhttprequestRestore() {
    window.XMLHttpRequest = oldXMLHttpRequest
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
            createMockXHR(fileContent);

            const response = heatMap.readFile(fileUrl);
            mockXHR.onreadystatechange();

            response.then((response) => {
                expect(response).toEqual(fileContent);
                done();
            });
        });

        it('should return an error if the file is not correct', (done) => {
            const exc = {error: 'any error'};
            createMockXHR(exc);

            const response = heatMap.readFile(fileUrl);
            mockXHR.onreadystatechange();

            response.catch((response) => {
                expect(response).toEqual(exc);
                done();
            });
        });

        afterEach(() => {
            xmlhttprequestRestore();
        });
    });
});












