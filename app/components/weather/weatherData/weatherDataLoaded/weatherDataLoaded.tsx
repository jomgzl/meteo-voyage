"use strict";

import { ICity } from "@/app/types/city";
import { IWeatherForecast } from "@/app/types/weather";
import WeatherView from "@/app/components/weather/weatherView/weatherView";

interface IProps {
  name: ICity["name"];
  weather: IWeatherForecast[];
  loading: boolean;
}

export default function WeatherDataLoading({ name, weather, loading }: IProps) {
  return <WeatherView name={name} weather={weather} loading={loading} />;
}
