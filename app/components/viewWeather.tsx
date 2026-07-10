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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./viewWeather.module.scss";

export default function ViewWeather({ name }: ICity) {
  const [weather, setWeather] = useState<IWeather>();
  const [error, setError] = useState<IError>();

  const fetchWeather = () => {
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
      });
  };

  useEffect(fetchWeather, [name]);

  if (weather) {
    return (
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: 620,
            p: { sm: 4 },
          }}
          className={`${styles.cardStyle}`}
        >
          <Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography variant="h5" sx={{ color: "#1b2530" }}>
                {name[0].toUpperCase() + name.slice(1)}
              </Typography>
              <WeatherIcon {...weather.weather[0]} />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
              <Typography variant="h1" sx={{ color: "#15202b" }}>
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
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
                >
                  {Math.round(weather.main.feels_like)}°C
                </Typography>
              </Stack>
              <Stack sx={{ ml: 2, mr: "auto" }}>
                <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                  Humidité
                </Typography>{" "}
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
                >
                  {" "}
                  {weather.main.humidity}%
                </Typography>
              </Stack>
              <Stack sx={{ ml: 2, mr: "auto" }}>
                <Typography sx={{ fontSize: 14, color: "#8a95a3" }}>
                  Vent
                </Typography>{" "}
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold", color: "#1b2530" }}
                >
                  {" "}
                  {Math.round(weather.wind.speed)} km/h
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>
    );
  }
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
  return null;
}
