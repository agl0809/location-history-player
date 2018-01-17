export default function heatmap() {
    const SCALAR_E7 = 0.0000001;

    function readFile(fileUrl) {
        const locationUrl = fileUrl;

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.overrideMimeType("application/json");
            request.open('GET', locationUrl, true);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    const resp = request.responseText;
                    if (resp.error) {
                        reject(resp);
                    } else {
                        resolve(resp);
                    }
                    request.send(null);
                }
            };
        });
    }

    function parseCoordenates(track) {
        let coordsParsed = [];

        track.locations.forEach((point) => {
            let lat, lon;

            lat = point.latitudeE7 * SCALAR_E7;
            lon = point.longitudeE7 * SCALAR_E7;

            coordsParsed.push([lat, lon]);
        });

        return coordsParsed;
    }

    return {readFile, parseCoordenates}
};