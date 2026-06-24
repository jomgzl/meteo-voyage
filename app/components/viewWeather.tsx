"use client";

import { useState, useEffect } from "react";
import { IWeather } from "@/app/types/weather";
import ErrorComponent from "@/app/components/error";
import { IError } from "@/app/types/error";
import WeatherIcon from "@/app/components/weatherIcon";

export default function ViewWeather() {
  const [weather, setWeather] = useState<IWeather>();
  const [error, setError] = useState<IError>();

  useEffect(() => {
    fetch("/api/openWeatherApi")
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error(
            "Erreur de récupération de données, nous travaillons pour régler le problème.",
          );
        }
      })
      .then((data) => {
        console.log("In fetch:", data);
        setWeather(data.weather as IWeather);
      })
      .catch((e) => {
        setError({ errorMessage: e.message });
        console.log(e);
      });
  }, []);

  console.log("In WeatherData function:", weather);
  if (weather) {
    return (
      <div className="z-40">
        <div className="text-center mt-6">
          <h1 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Meteo voyage
          </h1>
        </div>
        <div className="grid h-48 place-content-center text-white">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-5 md:justify-items-center md:gap-0">
            <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
              <p>{Math.round(weather.main.temp)} °C</p>
            </div>
            <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
              <p>Ressenti: {Math.round(weather.main.feels_like)} °C</p>
            </div>
            <div className="bg-amber-800 border border-amber-500 rounded-lg p-2 flex gap-1 fill-red-200">
              <WeatherIcon { ...weather }/>
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
              <p>{weather.main.humidity}% humidité</p>
            </div>
            <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
              <p>Vitesse du vent : {Math.round(weather.wind.speed)}</p>
            </div>
          </div>
        </div>
        {/* <form id="form">
              <label>Veuillez entre la ville</label>
              <input name="city" required />
              <button type="submit">Rechercher</button>
            </form> */}
      </div>
    );
  }
  if (error) return <ErrorComponent errorMessage={error.errorMessage} />;
  return null;
}
