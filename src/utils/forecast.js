const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const f = "f"
  const url =
    `http://api.weatherstack.com/current?access_key=8e2f42ea7952f0d4f3e317c5d2505e33&query=${latitude},${longitude}&units=f`
// `http://api.weatherstack.com/current?access_key=8e2f42ea7952f0d4f3e317c5d2505e33&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to Connect to Weather Services", undefined);
    } else if (body.error) {
      console.log(url)
      callback("Unable to Find Location from Weather Service", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} Degrees and it feels like ${body.current.feelslike} Degrees`
      );
    }
  });
};

module.exports = forecast;
