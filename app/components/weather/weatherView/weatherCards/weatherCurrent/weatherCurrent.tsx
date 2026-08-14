"use client";

import { IWeather } from "@/app/types/weather";
import WeatherIcon from "@/app/components/tools/weatherIcons/weatherIcon";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./weatherCurrent.module.scss";

interface IProps {
  name: string;
  weather: IWeather;
  loading: boolean;
}

export default function weatherCurrent({ name, weather, loading }: IProps) {
  console.log("eeeee", loading);
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 620,
        p: { sm: 4 },
      }}
      // className={`${loading === true} ? ${styles.cardStyle} : ${styles.cardStyle}`}
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
          <WeatherIcon
            width={60}
            height={60}
            id={weather.id}
            main={weather.main}
          />
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
          <Typography variant="h1" sx={{ color: "#15202b" }}>
            {Math.round(weather.temp)}°c
          </Typography>
          <Typography variant="h6" sx={{ pb: 3, color: "#41566d" }}>
            {" "}
            {weather.description[0].toUpperCase() +
              weather.description.slice(1)}
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
              {Math.round(weather.feels_like)}°C
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
              {weather.humidity}%
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
              {Math.round(weather.speed)} km/h
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
