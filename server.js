// File: server.js
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    getCityByName(name: String!): City
  }

  type City {
    name: String
    country: String
    weather: Weather
  }

  type Weather {
    summary: Summary
    temperature: Temperature
    wind: Wind
    clouds: Clouds
    timestamp: Int
  }

  type Summary {
    title: String
    description: String
    icon: String
  }

  type Temperature {
    actual: Float
    feelsLike: Float
    min: Float
    max: Float
  }

  type Wind {
    speed: Float
    deg: Int
  }

  type Clouds {
    all: Int
    visibility: Int
    humidity: Int
  }
`;

const resolvers = {
  Query: {
    getCityByName: async (_, { name }) => {
      try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`);
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
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Unable to fetch weather data');
      }
    },
  },
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: true,
    introspection: true
  });

server.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });