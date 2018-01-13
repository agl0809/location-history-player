import Heatmap from './heatmap.js';
import Dropzone from 'dropzone';

describe('Heatmap', () => {
    let heatzone;

    it('should be defined', () => {
        heatzone = Heatmap();
        expect(heatzone).toBeDefined();
    });

    describe('Initialization', () => {
        beforeEach(() => {
            heatzone.init();
        });

        it('should create an instance of Dropzone', () => {
            expect(heatzone.dropzone instanceof Dropzone).toBeTruthy();
        });
    });
});












