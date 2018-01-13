import Heatmap from './heatmap.js';

describe('Heatmap', () => {
    let heatmap;

    it('should be defined', () => {
        heatmap = Heatmap();
        expect(heatmap).toBeDefined();
    });

    describe('reading a file', () => {
        it('should open a local file with a right path', () => {
            let fileUrl = 'any url';
            spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
            spyOn(XMLHttpRequest.prototype, 'send');

            heatmap.readFile(fileUrl);

            expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
        });
    });
});












