import LeafMap from 'leaflet';
import {readFile, parseCoordenates, createMap, createHeatMap} from '../../src/js/HeatMap.js';

const READY_STATE = 4;
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
    const promise = readFile(fileUrl);
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
});

describe('parsing the file\'s content', () => {
    it('should return an array of coordinates parsed properly', () => {
        const SCALAR_E7 = 0.0000001;
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
        let coordsParsed;

        coordsParsed = parseCoordenates(fileContent, SCALAR_E7);
        expect(coordsParsed).toEqual(expectedObject);
    });
});

describe('drawing a map', () => {
    it('should create a map', () => {
        const HEATMAP_CONTAINER_ID = 'any id';
        const CENTER_COORDS = 'any coords';
        const ZOOM_LEVEL = 'any zoom';
        const TILE_LAYER_OPTIONS = {
            attribution: 'any attribution',
            maxZoom: 'any max zoom',
            minZoom: 'any min zoom'
        };
        const URL_TEMPLATE = 'any urlTemplate';

        const MockSetView = {setView: jest.fn()};
        const MockAddTo = {addTo: jest.fn()};
        LeafMap.map = jest.fn(() => MockSetView);
        LeafMap.tileLayer = jest.fn(() => MockAddTo);

        createMap(HEATMAP_CONTAINER_ID, CENTER_COORDS, ZOOM_LEVEL, URL_TEMPLATE, TILE_LAYER_OPTIONS);

        expect(LeafMap.map).toBeCalledWith(HEATMAP_CONTAINER_ID);
        expect(MockSetView.setView).toBeCalledWith(CENTER_COORDS, ZOOM_LEVEL);
        expect(LeafMap.tileLayer).toBeCalledWith(URL_TEMPLATE, TILE_LAYER_OPTIONS);
    });

    it('should create a heat layer on the map using the coordenates received', () => {
        const heatOptions = {
            tileOpacity: 'any tileOpacity',
            heatOpacity: 'any heatOpacity',
            radius: 'any radius',
            blur: 'any blur'
        };
        const coords = ['any lat', 'any lon'];
        const mapInstance = {};

        const MockAddTo = {addTo: jest.fn()};
        LeafMap.heatLayer = jest.fn(() => MockAddTo);

        const MockHeatMap = {redraw: jest.fn()};
        MockAddTo.addTo.mockReturnValue(MockHeatMap);

        createHeatMap(mapInstance, coords, heatOptions);

        expect(LeafMap.heatLayer).toBeCalledWith(coords, heatOptions);
        expect(MockAddTo.addTo).toBeCalledWith(mapInstance);
        expect(MockHeatMap.redraw).toBeCalled();
    });
});













