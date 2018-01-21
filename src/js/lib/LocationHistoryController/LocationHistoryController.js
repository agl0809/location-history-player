import * as LocationHistory from '../../../../src/js/lib/LocationHistoryController/LocationHistory';
import {SCALAR_E7} from '../../../../src/helpers/constants';

function getCoordinates(JSONFileUrl) {
    return new Promise((resolve, reject) => {

        LocationHistory.readFile(JSONFileUrl).then((fileContent) => {
            resolve(LocationHistory.parseCoordinates(fileContent, SCALAR_E7));
        });
    });
}

export default function LocationHistoryController() {
    return {getCoordinates};
}