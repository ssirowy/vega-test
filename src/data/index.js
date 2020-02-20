import { data as carsData, schema as carsSchema } from './cars'
import { data as weatherData, schema as weatherSchema } from './weather'
import { data as movieData, schema as movieSchema } from './movies'
import { data as populatiionData, schema as populationSchema } from './population'

export const dataSets = [
  {
    data: populatiionData,
    label: "Population",
    schema: populationSchema
  },
  {
    data: weatherData,
    label: "Weather",
    schema: weatherSchema
  },
  {
    data: carsData,
    label: "Cars",
    schema: carsSchema
  },
  {
    data: movieData,
    label: "Movies",
    schema: movieSchema
  }
];