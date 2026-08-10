import { IWeatherAPI, IWeatherResult } from "@/app/types/weather";
import day from "@/app/components/tools/dates/day";

const dayjs = require("dayjs");

const getWeatherForecast = (weatherList: IWeatherAPI[]): IWeatherResult[] => {
  const result: IWeatherResult[] = [];
  let currentDay: number | null = null;
  weatherList.forEach((weatherItem, index) => {
    const weatherItemDay = dayjs.unix(weatherItem.dt).date();

    console.log("Weather Item at index: ", index, weatherItem)

    // result[index].temp_min = weatherItem.main.temp_min,

    result.forEach((resultItem) => {
      if (currentDay === weatherItemDay && resultItem.day === currentDay) {
        if (weatherItem.main.temp_min < resultItem.temp_min) {
          resultItem.temp_min = weatherItem.main.temp_min;
        }
        if (weatherItem.main.temp_max > resultItem.temp_max) {
          resultItem.temp_max = weatherItem.main.temp_max;
        }
      }
    });

    if (currentDay !== weatherItemDay) {
      const weatherDay: IWeatherResult = {
        description: "",
        temp: 0,
        temp_min: weatherItem.main.temp_min,
        temp_max: weatherItem.main.temp_max,
        feels_like: 0,
        humidity: 0,
        main: "",
        speed: 0,
        date: dayjs.unix(weatherItem.dt).format("dd-MM-YYYY"),
        day: dayjs.unix(weatherItem.dt).date(),
      };
      //   if (dayjs.unix(weatherItem.dt).hour() === 11) {
      //     weatherDay["description"] = weatherItem.weather[0].description;
      //     weatherDay["temp"] = weatherItem.main.temp;
      //     weatherDay["feels_like"] = weatherItem.main.feels_like;
      //     weatherDay["humidity"] = weatherItem.main.humidity;
      //     weatherDay["speed"] = weatherItem.wind.speed;
      //     weatherDay["humidity"] = weatherItem.main.humidity;
      //     weatherDay["main"] = weatherItem.weather[0].main;
      //   }
      result.push(weatherDay);
      currentDay = weatherItemDay;
    }
  });
  return result;
};

export default getWeatherForecast;
