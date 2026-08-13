"use client";

import { ICity } from "@/app/types/city";
import { IWeather, IWeatherForecast } from "@/app/types/weather";

import styles from "./weatherFifteenDaysList.module.scss";

import { Fragment } from "react";

import WeatherFifteenDaysCard from "@/app/components/weather/weatherFifteenDays/weatherFifteenDaysCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface IProps {
  name: ICity["name"];
  weatherForecast: IWeatherForecast[];
}

export default function WeatherFifteenDaysList({
  name,
  weatherForecast,
}: IProps) {
  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", maxWidth: 620, p: { sm: 4 }, pt: { xs: 4 } }}
      className={`${styles.cardStyle}`}
    >
      <Box>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#1b2530", fontWeight: 600, fontSize: 18 }}
          >
            Prévisions sur 5 jours
          </Typography>
          <Typography sx={{ color: "#aab3bf" }}>
            {name[0].toUpperCase() + name.slice(1)}
          </Typography>
        </Stack>

        {weatherForecast.map((weatherCurrentDay) => {
          return (
            <Fragment key={weatherCurrentDay.date}>
              <WeatherFifteenDaysCard {...weatherCurrentDay} />
              {/* <WeatherFifteenDaysCard weatherCurrentDay={weatherCurrentDay} /> */}
              <div>
                {weatherCurrentDay === weatherForecast.at(-1) ? null : (
                  <Divider />
                )}
              </div>
            </Fragment>
          );
        })}
      </Box>
    </Card>
  );
}
