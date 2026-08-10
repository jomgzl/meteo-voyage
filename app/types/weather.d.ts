export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
}

export interface IWeather {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  temp_max: number;
  id: number;
  main: string;
  description: string;
  speed: number;
}

export interface IWeatherForecast {
  dt: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  id: number;
  main: string;
  description: string;
  speed: number;
}

export interface IWeatherAPI {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: [{ id: number; main: string; description: string }];
  wind: { speed: number };
}

export interface IWeatherResult {
  day: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  date: string;
  main: string;
  description: string;
  speed: number;
}
