import { data as carsData, schema as carsSchema } from './cars'
import { data as weatherData, schema as weatherSchema } from './weather'

export const dataSets = [
  {
    data: weatherData,
    label: "Weather",
    schema: weatherSchema
  },
  {
    data: carsData,
    label: "Cars",
    schema: carsSchema
  }
];