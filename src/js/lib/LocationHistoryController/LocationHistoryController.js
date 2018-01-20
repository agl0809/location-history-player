import * as LocationHistory from '../../../../src/js/lib/LocationHistoryController/LocationHistory';
import {SCALAR_E7} from '../../../../src/helpers/constants';

function getCoordenates(JSONFileUrl) {
    return new Promise((resolve, reject) => {
        LocationHistory.readFile(JSONFileUrl).then((fileContent) => {
            resolve(LocationHistory.parseCoordenates(fileContent, SCALAR_E7));

        });
    });
}

export default function LocationHistoryController() {
    return {getCoordenates};
}