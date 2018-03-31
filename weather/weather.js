const request = require("request");

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/c182f8d606b23ca49b0564b54019127a/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        if (error) {
          callback("Unable to connect to Forecast.io server");
        } else if (response.statusCode === 400) {
          callback("Unable to fetch weather.");
        }
      }
    }
  );
};

module.exports = {
  getWeather
};
