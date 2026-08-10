import { IWeatherForecast } from "@/app/types/weather";

const dayjs = require("dayjs");

interface IweatherDescriptions {
  key?: string;
}

export const dataExtractionCurrentWeather = (
  openApiWeather,
): IWeatherForecast => {
  const {
    dt,
    main: { temp, feels_like, temp_min, temp_max, humidity },
    weather: [{ id, main, description }],

    wind: { speed },
  } = openApiWeather;
  return {
    dt,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    id,
    main,
    description,
    speed,
  };
};

const dataExtractionForecastWeather = (openApiWeather) => {
  const openApiWeatherExtracted = openApiWeather.map((item) => {
    const {
      dt,
      main: { temp, feels_like, temp_min, temp_max, humidity },
      weather: [{ id, main, description }],
      wind: { speed },
    } = item;

    return {
      dt,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      id,
      main,
      description,
      speed,
    };
  });
  return openApiWeatherExtracted;
};

const weatherSameDay = (cleanedWeather: IWeatherForecast) => {
  let temperaturesDayOne = [];
  let temperaturesDayTwo = [];
  let temperaturesDayThree = [];
  let temperaturesDayFour = [];
  let temperaturesDayFive = [];

  const currentDayNumber = dayjs().date();
  for (let i = 0; i < cleanedWeather.length; i++) {
    if (dayjs.unix(cleanedWeather[i].dt).date() === currentDayNumber) {
      temperaturesDayOne.push(cleanedWeather[i].temp_min);
      temperaturesDayOne.push(cleanedWeather[i].temp_max);
    } else if (
      dayjs.unix(cleanedWeather[i].dt).date() ===
      currentDayNumber + 1
    ) {
      temperaturesDayTwo.push(cleanedWeather[i].temp_min);
      temperaturesDayTwo.push(cleanedWeather[i].temp_max);
    } else if (
      dayjs.unix(cleanedWeather[i].dt).date() ===
      currentDayNumber + 2
    ) {
      temperaturesDayThree.push(cleanedWeather[i].temp_min);
      temperaturesDayThree.push(cleanedWeather[i].temp_max);
    } else if (
      dayjs.unix(cleanedWeather[i].dt).date() ===
      currentDayNumber + 3
    ) {
      temperaturesDayFour.push(cleanedWeather[i].temp_min);
      temperaturesDayFour.push(cleanedWeather[i].temp_max);
    } else if (
      dayjs.unix(cleanedWeather[i].dt).date() ===
      currentDayNumber + 4
    ) {
      temperaturesDayFive.push(cleanedWeather[i].temp_min);
      temperaturesDayFive.push(cleanedWeather[i].temp_max);
    }
  }
  return [
    temperaturesDayOne,
    temperaturesDayTwo,
    temperaturesDayThree,
    temperaturesDayFour,
    temperaturesDayFive,
  ];
};

const weatherMinMax = (cleanedWeather: IWeatherForecast) => {
  const [
    temperaturesDayOne,
    temperaturesDayTwo,
    temperaturesDayThree,
    temperaturesDayFour,
    temperaturesDayFive,
  ] = weatherSameDay(cleanedWeather);
  const tempMinDayOne = Math.min(...temperaturesDayOne);
  const tempMaxDayOne = Math.max(...temperaturesDayOne);
  const tempMinDayTwo = Math.min(...temperaturesDayTwo);
  const tempMaxDayTwo = Math.max(...temperaturesDayTwo);
  const tempMinDayThree = Math.min(...temperaturesDayThree);
  const tempMaxDayThree = Math.max(...temperaturesDayThree);
  const tempMinDayFour = Math.min(...temperaturesDayFour);
  const tempMaxDayFour = Math.max(...temperaturesDayFour);
  const tempMinDayFive = Math.min(...temperaturesDayFive);
  const tempMaxDayFive = Math.max(...temperaturesDayFive);

};

export function weatherParsing(weatherForecast: IWeatherForecast) {
  const cleanedWeather = dataExtractionForecastWeather(weatherForecast);
  //Description, prendre celle du midi
  let descriptions: IweatherDescriptions = {};
  const descriptionKey = "key";
  let descriptionKeyCounter = 0;
  cleanedWeather.forEach((item: IWeatherForecast) => {
    const weatherHour = dayjs.unix(item.dt).hour();
    if (weatherHour === 11) {
      descriptions[
        (descriptionKey + descriptionKeyCounter++) as keyof IweatherDescriptions
      ] = item.description;
    }
  });
  weatherMinMax(cleanedWeather);
  return descriptions;
  //Pour les temps min et max, prendre la plus basse et la plus haute de la journée
}
