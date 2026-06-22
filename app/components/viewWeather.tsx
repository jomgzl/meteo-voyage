"use client";

import { useState, useEffect } from "react";

interface weatherCondition {
  description: string;
}

type Response = {
  data: {
    weather: {
      main: { temp: number; feelsLike: string; humidity: number };
      wind: { speed: number };
      weather: weatherCondition[];
    };
  };
};

export default function ViewWeather() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api/openWeatherApi")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("In fetch:", data);
      });
  }, []);

  function WeatherData(data: Response) {
    console.log("In WeatherData function:", data);
    if (!data) {
      return (
        <div>
          <p>{data.weather.main.temp} °C</p>
          <p>Ressenti {data.weather.main.feels_like} °C</p>
          <p>{data.weather.weather[0].description}</p>
          <p>{data.weather.main.humidity}% humidité</p>
          <p>Vitesse du vent : {data.weather.wind.speed}</p>
          <p>Test</p>
        </div>
      );
    }
  }

  return <WeatherData data={data} />;
}
