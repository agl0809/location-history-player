import registerServiceWorker from './registerServiceWorker';
import HeatMap from './HeatMap';
registerServiceWorker();

let heatMap, promise;

heatMap = HeatMap();
promise = heatMap.readFile('static/js/history.json');
promise.then((response) =>{
   console.log('coords', heatMap.parseCoordenates(response));
});
