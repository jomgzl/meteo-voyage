import { IWeatherAPI, IWeatherForecast } from "@/app/types/weather";
import day from "@/app/components/tools/dates/day";

const dayjs = require("dayjs");

const getWeatherForecast = (weatherList: IWeatherAPI[]): IWeatherForecast[] => {
  const result: IWeatherForecast[] = [];
  let currentDay: number | null = null;
  weatherList.forEach((weatherItem) => {
    const weatherItemDay = dayjs.unix(weatherItem.dt).date();
    const weatherItemHour = dayjs.unix(weatherItem.dt).hour();

    if (currentDay !== weatherItemDay) {
      // On change de jour
      const weatherDay: IWeatherForecast = {
        id: weatherItem.weather[0].id,
        description: weatherItem.weather[0].description,
        temp: weatherItem.main.temp,
        temp_min: weatherItem.main.temp_min,
        temp_max: weatherItem.main.temp_max,
        feels_like: weatherItem.main.feels_like,
        humidity: weatherItem.main.humidity,
        main: weatherItem.weather[0].main,
        speed: weatherItem.wind.speed,
        date: dayjs.unix(weatherItem.dt).format("dd-MM-YYYY"),
        day: dayjs.unix(weatherItem.dt).date(),
        dayString: day(weatherItem.dt),
      };
      result.push(weatherDay);
      currentDay = weatherItemDay;
    } else {
      // On reste sur le même jour
      result[result.length - 1].temp_min =
        result[result.length - 1].temp_min > weatherItem.main.temp_min
          ? weatherItem.main.temp_min
          : result[result.length - 1].temp_min;
      result[result.length - 1].temp_max =
        result[result.length - 1].temp_max < weatherItem.main.temp_max
          ? weatherItem.main.temp_max
          : result[result.length - 1].temp_max;

      if (weatherItemHour === 14) {
        result[result.length - 1] = {
          ...result[result.length - 1],
          description: weatherItem.weather[0].description,
          temp: weatherItem.main.temp,
          feels_like: weatherItem.main.feels_like,
          humidity: weatherItem.main.humidity,
          speed: weatherItem.wind.speed,
          main: weatherItem.weather[0].main,
        };
      }
    }
  });
  return result.filter(
    (_, index) => index < Math.floor(weatherList.length / 8),
  );
};

export default getWeatherForecast;
