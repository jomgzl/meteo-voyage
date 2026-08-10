"use client";

import { useState, useEffect } from "react";
import { IWeather } from "@/app/types/weather";
import { ICity } from "@/app/types/city";
import { IError } from "@/app/types/error";

import WeatherCurrent from "@/app/components/weather/weatherCurrent/weatherCurrent";
import WeatherFifteenDaysList from "@/app/components/weather/weatherFifteenDays/weatherFifteenDaysList";
import WeatherLoading from "@/app/components/weather/weatherLoading/weatherLoading";
import ErrorComponent from "@/app/components/tools/error/error";

import styles from "./weatherView.module.scss";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function WeatherView({ name }: ICity) {
  const [weather, setWeather] = useState<IWeather>();
  const [weatherForecast, setweatherForecast] = useState({});
  const [error, setError] = useState<IError>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = () => {
    setWeather(undefined);
    setError(undefined);
    setLoading(true);
    fetch("/api/openWeatherApi", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else if (response.status === 404) {
          throw new Error("Ville introuvable", {
            cause: "API error",
          });
        } else if (response.status) {
          throw new Error(
            "Une erreur interne s'est produite, nous travaillons pour régler le problème.",
            {
              cause: "API error",
            },
          );
        } else {
          console.log("I am here");
          throw new Error(
            "Erreur de récupération de données, vérifiez votre connexion internet.",
            {
              cause: "API error",
            },
          );
        }
      })
      .then((data) => {
        setWeather(data.weather as IWeather);
        setweatherForecast(data.weatherForecast);
      })
      .catch((e) => {
        if (e.cause === "API error") {
          setError({ errorMessage: e.message, additionalDetails: e.cause });
        } else {
          setError({
            errorMessage:
              "Erreur de récupération de données, vérifiez votre connexion internet.",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(fetchWeather, [name]);
  if (error)
    return (
      <Card
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: 620,
          minHeight: 200,
          minWidth: { xs: "93vw", sm: "96vw", md: 620 },
          p: { sm: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">
            <ErrorComponent
              errorMessage={error.errorMessage}
              additionalDetails={error.additionalDetails}
            />
          </Typography>
        </Box>
        {error.errorMessage ===
          "Erreur de récupération de données, vérifiez votre connexion internet." && (
          <Button onClick={fetchWeather}>Réessayer</Button>
        )}
      </Card>
    );
  if (weather) {
    return (
      <div className={`${styles.weatherComponents}`}>
        <WeatherCurrent name={name} weather={weather} />
        <WeatherFifteenDaysList
          name={name}
          weatherForecast={weatherForecast}
        />
      </div>
    );
  }
  return null;
}
