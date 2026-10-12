"use strict";

import { ICity } from "@/app/types/city";
import { IWeatherForecast } from "@/app/types/weather";
import WeatherView from "@/app/components/weather/weatherView/weatherView";

interface IProps {
  name: ICity["name"];
  weather: IWeatherForecast[];
}

export default function WeatherDataLoading({ name, weather }: IProps) {
  return <WeatherView name={name} weather={weather} loading={false} />;
}
