import heatmap from './heatmap.js';

describe('heatmap', () => {
    let anyHeatmap; //TODO Include readfile dependency
    let anyCoords = {
        lat: 'any lat',
        lng: 'any lng'
    };

    let whenHeatMapIsExecuted = () => {
        anyHeatmap = heatmap();
    };

    describe('reading data', () => {
        it('should gets a proper object ', () => {
            whenHeatMapIsExecuted();
            expect(anyHeatmap.getCoords()).toEqual(anyCoords)
        });

        it('should not store coordinates with a valid message', () => {

        });
    });
});












