"use client";

import { useState, useEffect } from "react";
import { IWeather } from "@/app/types/weather";
import { ICity } from "@/app/types/city";
import { IError } from "@/app/types/error";
import ErrorComponent from "@/app/components/error";
import WeatherIcon from "@/app/components/weatherIcon";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import styles from "./viewWeather.module.css";

export default function ViewWeather({ name }: ICity) {
  const [weather, setWeather] = useState<IWeather>();
  const [error, setError] = useState<IError>();
  console.log("This is what I received from the user", name);

  useEffect(() => {
    setWeather(undefined);
    setError(undefined);
    fetch("/api/openWeatherApi", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        else if (response.status === 404) {
          throw new Error("Ville introuvable.");
        } else if (response.status) {
          throw new Error(
            "Une erreur interne s'est produite, nous travaillons pour régler le problème.",
          );
        } else {
          throw new Error(
            "Erreur de récupération de données, vérifiez votre connexion internet.",
          );
        }
      })
      .then((data) => {
        setWeather(data.weather as IWeather);
      })
      .catch((e) => {
        setError({ errorMessage: e.message });
      });
  }, [name]);

  if (weather) {
    return (
      <Card
        variant="outlined"
        className={`${styles.cardStyle}`}
        sx={{ maxWidth: 620, p: 4 }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={4}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="h5">
              {name[0].toUpperCase() + name.slice(1)}
            </Typography>
            <WeatherIcon {...weather.weather[0]} />
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
            <Typography variant="h1">
              {Math.round(weather.main.temp)}°c
            </Typography>
            <Typography variant="h6" sx={{ pb: 3, color: "#41566d" }}>
              {" "}
              {weather.weather[0].description[0].toUpperCase() +
                weather.weather[0].description.slice(1)}
            </Typography>
          </Stack>
        </Box>
        <Divider variant="middle" sx={{ bgcolor: "#edf1f5" }} />
        <Box>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", mt: 2 }}
            divider={
              <Divider
                orientation="vertical"
                variant="middle"
                sx={{ bgcolor: "#edf1f5" }}
                flexItem
              />
            }
          >
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Ressenti
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {Math.round(weather.main.feels_like)}°C
              </Typography>
            </Stack>
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Humidité
              </Typography>{" "}
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {weather.main.humidity}%
              </Typography>
            </Stack>
            <Stack sx={{ ml: 2, mr: "auto" }}>
              <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                Vent
              </Typography>{" "}
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {" "}
                {Math.round(weather.wind.speed)} km/h
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
    );
  }
  if (error) return <ErrorComponent errorMessage={error.errorMessage} />;
  return null;
}
