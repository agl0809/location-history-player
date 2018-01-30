function timeLineParser(coordinatesText, SCALAR_E7) {
    let coordsParsed = [];

    JSON.parse(coordinatesText).forEach((point) => {
        let lat, lon;

        lat = point.latitudeE7 * SCALAR_E7;
        lon = point.longitudeE7 * SCALAR_E7;

        coordsParsed.push([lat, lon]);
    });

    return coordsParsed;
}

export {timeLineParser};