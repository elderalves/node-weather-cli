const yargs = require("yargs");
const axios = require("axios");

const args = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch watch for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodedAddress = encodeURIComponent(args.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeUrl)
  .then(res => {
    if (res.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address.");
    } else if (res.data.results.length <= 0) {
      throw new Error("No response from the API.");
    } else {
      const lat = res.data.results[0].geometry.location.lat;
      const lng = res.data.results[0].geometry.location.lng;
      const weatherUrl = `https://api.darksky.net/forecast/c182f8d606b23ca49b0564b54019127a/${lat},${lng}`;
      return axios.get(weatherUrl);
    }
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}.`
    );
  })
  .catch(err => {
    if (err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
      console.log("Unable to connect to API servers.");
    } else {
      console.log(err);
    }
  });
