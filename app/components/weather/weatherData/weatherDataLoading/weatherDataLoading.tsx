"use client";

import { IWeatherForecast } from "@/app/types/weather";
import { ICity } from "@/app/types/city";

import WeatherView from "@/app/components/weather/weatherView/weatherView";

interface IProps {
  name: ICity["name"];
}

const weatherLoadingList: IWeatherForecast[] = [];

for (let i = 0; i < 5; i++) {
  const weatherLoading: IWeatherForecast = {
    id: 0,
    day: 10,
    dayString: "Tuesday",
    temp: 20,
    feels_like: 20,
    temp_min: 20,
    temp_max: 20,
    humidity: 30,
    date:
      Math.floor(Math.random() * 31) +
      "/" +
      Math.floor(Math.random() * 12) +
      "/" +
      Math.floor(Math.random() * 2030),
    main: "unknown",
    description: "unknown",
    speed: 1.5,
  };
  weatherLoadingList.push(weatherLoading);
}

export default function WeatherDataLoading({ name }: IProps) {
  return (
    <WeatherView name={name} weather={weatherLoadingList} loading={true} />
  );
}
