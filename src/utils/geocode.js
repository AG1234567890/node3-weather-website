const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZXBpY3dhdGVyIiwiYSI6ImNrcjE1aWJrMTFxZGQzMXJ6dzcza3VmcTQifQ.TX1FwbKe67OMGlaEmKpvjw&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to Location Services", undefined);
    } else if (body.length === 0) {
      callback("Unable to Find Location on Geocode Services", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
