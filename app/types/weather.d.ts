interface IWeatherCondition {
  description: string;
}

export interface IWeather {
  main: { temp: number; feels_like: string; humidity: number };
  wind: { speed: number };
  weather: IWeatherCondition[];
}
