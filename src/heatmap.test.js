import heatmap from './heatmap.js';
import Dropzone from 'dropzone';

describe('heatmap', () => {
    let Controller;

    it('should be defined', () => {
        Controller = heatmap();
        expect(Controller).toBeDefined();
    });

    describe('Initialization', () => {
        beforeEach(() => {
            Controller.init();
        });

        it('should create an instance of Dropzone', () => {
            expect(Controller.dropzone instanceof Dropzone).toBeTruthy();
        });
    });
});












