const request = require("request");

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request(
    {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    function(error, response, body) {
      if (error) {
        callback("Unable to connect to Google");
      } else if (body.status === "ZERO_RESULTS") {
        callback("Unable to find that address.");
      } else {
        callback(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
