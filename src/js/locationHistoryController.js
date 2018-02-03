import {locationHistoryParser} from 'js/locationHistoryParser';
import {service} from 'js/service';
import {SCALAR_E7} from 'helpers/constants';

function getCoordinates(JSONFileUrl) {
  return new Promise((resolve) => {
    service(JSONFileUrl).then(fileContent => {
      resolve(locationHistoryParser(fileContent, SCALAR_E7));
    });
  });
}

export {getCoordinates};
