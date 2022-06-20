const req = require("request");

const geoCode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmh1dmFuMjIwNSIsImEiOiJjbDNvY2E1cDAwMGRqM2RwZGdmdzJjbXl2In0.Mb4UKHfzRMotLSc3MRAMWw&limit=1`;

    req({ url: url, json: true }, (error, {body}) => {

        if (error) {
            callback("Check your Network Connection..", undefined);
        } else if ((body.features == '')) {
            callback("Something went wrong", undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;

            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geoCode



