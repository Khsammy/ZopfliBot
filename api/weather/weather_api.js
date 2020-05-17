const axios = require("axios");

async function getWeather(query) {
  let res = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=cbff05ebd3735a1537f2272479264290`
  );

  return {
    name: res.data.name,
    country: res.data.sys.country,
    main_weather: res.data.weather[0].main,
    describe_weather: res.data.weather[0].description,
  };
}

module.exports = getWeather;
