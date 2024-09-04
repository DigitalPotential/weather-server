const typeDefs = `
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

module.exports = typeDefs;