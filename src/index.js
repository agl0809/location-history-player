import registerServiceWorker from './registerServiceWorker';
import HeatMap from './HeatMap';

registerServiceWorker();
let heatMap = HeatMap();
heatMap.getCoords('http://localhost:3000/history.json');
