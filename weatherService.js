const axios = require('axios');

async function getWeatherData(cityName) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
  const data = response.data;

  return {
    name: data.name,
    country: data.sys.country,
    weather: {
      summary: {
        title: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      temperature: {
        actual: data.main.temp,
        feelsLike: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max,
      },
      wind: {
        speed: data.wind.speed,
        deg: data.wind.deg,
      },
      clouds: {
        all: data.clouds.all,
        visibility: data.visibility,
        humidity: data.main.humidity,
      },
      timestamp: data.dt,
    },
  };
}

module.exports = { getWeatherData };