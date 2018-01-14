import HeatMap from './HeatMap.js';

describe('HeatMap', () => {
    let heatMap;

    it('should be defined', () => {
        heatMap = HeatMap();
        expect(heatMap).toBeDefined();
    });

    describe('reading a file', () => {
        let fileUrl = 'any url';

        it('should return an object with the file data extracted', (done) => {
            const fileContent = [{title: 'any title'}];
            const mockXHR = {
                open: jest.fn(),
                send: jest.fn(),
                overrideMimeType: jest.fn(),
                readyState: 4,
                responseText: JSON.stringify(fileContent)
            };

            const oldXMLHttpRequest = window.XMLHttpRequest;
            window.XMLHttpRequest = jest.fn(() => mockXHR);

            const response = heatMap.readFile(fileUrl);
            mockXHR.onreadystatechange();

            response.then((objectExtracted) => {
                expect(objectExtracted).toEqual(fileContent);
                expect(objectExtracted[0].title).toBe('any title');
                done();
            });

            window.XMLHttpRequest = oldXMLHttpRequest
        });
    });
});












