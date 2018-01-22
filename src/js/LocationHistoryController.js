import timeLineTakeoutParser from 'js/timeLineTakeoutParser';
import service from 'js/service';
import {SCALAR_E7} from 'js/constants';

function getCoordinates(JSONFileUrl) {
    return new Promise((resolve, reject) => {
        service(JSONFileUrl).then((fileContent) => {
            resolve(timeLineTakeoutParser(fileContent, SCALAR_E7));
        });
    });
}

export default function LocationHistoryController() {
    return {getCoordinates};
}