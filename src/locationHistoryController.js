import {locationHistoryParser} from './locationHistoryParser';
import {service} from 'services/service';
import {SCALAR_E7} from 'helpers/constants';

function getCoordinates(JSONFileUrl) {
  return new Promise((resolve) => {
    service(JSONFileUrl).then(fileContent => {
      resolve(locationHistoryParser(fileContent, SCALAR_E7));
    });
  });
}

export {getCoordinates};
