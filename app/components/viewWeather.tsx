"use client";

import { useState, useEffect } from "react";
import { IWeather } from "@/app/types/weather";
import ErrorComponent from "@/app/components/error";
import { IError } from "@/app/types/error";

export default function ViewWeather() {
  const [weather, setWeather] = useState<IWeather>();
  const [error, setError] = useState<IError>();

  useEffect(() => {
    fetch("/api/openWeatherApi")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("E");
      })
      .then((data) => {
        console.log("In fetch:", data);
        setWeather(data.weather as IWeather);
      })
      .catch(() => {
        setError({ errorMessage: "Erreur de récupération des données" });
      });
  }, []);

  console.log("In WeatherData function:", weather);
  if (weather) {
    return (
      <div>
        <p>{weather.main.temp} °C</p>
        <p>Ressenti {weather.main.feels_like} °C</p>
        <p>{weather.weather[0].description}</p>
        <p>{weather.main.humidity}% humidité</p>
        <p>Vitesse du vent : {weather.wind.speed}</p>
        <p>Test</p>
      </div>
    );
  }
  if (error) return <ErrorComponent errorMessage={error.errorMessage} />;
  return null;
}
