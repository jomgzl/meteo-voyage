"use client";

import { IWeatherForecast } from "@/app/types/weather";

import styles from "./weatherForecastCard.module.scss";

import WeatherIcon from "@/app/components/tools/weatherIcons/weatherIcon";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function WeatherForecastCard({
  id,
  dayString,
  main,
  temp_min,
  temp_max,
}: IWeatherForecast) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 620,
        p: 2,
      }}
      className={`${styles.cardStyle}`}
    >
      <Box>
        <Stack
          direction="row"
          spacing={4}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="h5" sx={{ color: "#41566d", fontSize: 16 }}>
            {dayString}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <WeatherIcon width={30} height={30} main={main} id={id} />
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" sx={{ color: "#8a95a3", fontSize: 16 }}>
                {Math.round(temp_min)}°
              </Typography>
              <Typography variant="h6" sx={{ color: "#1b2530", fontSize: 16 }}>
                {Math.round(temp_max)}°
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}