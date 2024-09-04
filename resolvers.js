const { getWeatherData } = require('./weatherService');

const resolvers = {
  Query: {
    getCityByName: async (_, { name }) => {
      try {
        const weatherData = await getWeatherData(name);
        return weatherData;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Unable to fetch weather data');
      }
    },
  },
};

module.exports = resolvers;