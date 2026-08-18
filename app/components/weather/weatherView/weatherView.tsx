"use strict";

import { ICity } from "@/app/types/city";
import { IWeatherForecast } from "@/app/types/weather";
import { Fragment } from "react/jsx-runtime";

import WeatherCurrent from "@/app/components/weather/weatherView/weatherCards/weatherCurrent/weatherCurrent";
import WeatherForecastList from "@/app/components/weather/weatherView/weatherCards/weatherForecast/weatherForecastList";

interface IProps {
  name: ICity["name"];
  weather: IWeatherForecast[];
  loading: boolean;
}

export default function WeatherView({ name, weather, loading }: IProps) {
  const [weatherCurrent, ...weatherForecast] = weather;
  return (
    <Fragment>
      <WeatherCurrent name={name} weather={weatherCurrent} loading={loading} />
      <WeatherForecastList
        name={name}
        weatherForecast={weatherForecast}
        loading={loading}
      />
    </Fragment>
  );
}
