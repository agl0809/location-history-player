export function readFile(fileUrl) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                const resp = request.responseText;
                if (resp.error) {
                    reject(resp);
                } else {
                    resolve(resp);
                }
            }
        };
        request.open('GET', fileUrl, true);
        request.send(null);
    });
}

export function parseCoordinates(coordinatesText, SCALAR_E7) {
    let coordsParsed = [];

    JSON.parse(coordinatesText).locations.forEach((point) => {
        let lat, lon;

        lat = point.latitudeE7 * SCALAR_E7;
        lon = point.longitudeE7 * SCALAR_E7;

        coordsParsed.push([lat, lon]);
    });

    return coordsParsed;
}