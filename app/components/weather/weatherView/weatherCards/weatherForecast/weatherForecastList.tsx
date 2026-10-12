"use client";

import { ICity } from "@/app/types/city";
import { IWeatherForecast } from "@/app/types/weather";

import envVariableStringToNumber from "@/app/tools/envVariable/envVariableStringToNumber";

import styles from "./weatherForecastList.module.scss";

import { Fragment } from "react";

import WeatherFifteenDaysCard from "@/app/components/weather/weatherView/weatherCards/weatherForecast/weatherForecastCard";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface IProps {
  name: ICity["name"];
  weatherForecast: IWeatherForecast[];
  loading: boolean;
}

export default function WeatherFifteenDaysList({
  name,
  weatherForecast,
  loading,
}: IProps) {
  const forecastTotalNumberOfInstances = envVariableStringToNumber(
    process.env.NEXT_PUBLIC_ENV_FORECAST_TOTAL_NUMBER_OF_INSTANCES,
  );

  const forectCastDailyNumberOfInstances = envVariableStringToNumber(
    process.env.NEXT_PUBLIC_ENV_FORECAST_NUMBER_OF_DAILY_INSTANCES,
  );

  const forecastNumberOfDaysValidated = (
    forecastTotalNumberOfInstances: number | undefined,
    forectCastDailyNumberOfInstances: number | undefined,
  ) => {
    try {
      if (forecastTotalNumberOfInstances && forectCastDailyNumberOfInstances) {
        return (
          forecastTotalNumberOfInstances / forectCastDailyNumberOfInstances - 1
        );
      } else {
        throw new Error(
          "There was a problem with one or both environement variables",
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const forecastNumberOfDays = forecastNumberOfDaysValidated(
    forecastTotalNumberOfInstances,
    forectCastDailyNumberOfInstances,
  );

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", maxWidth: 620, p: { sm: 4 }, pt: { xs: 4 } }}
      className={`${loading ? styles.cardStyleBlur : styles.cardStyle}`}
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
            Prévisions sur {forecastNumberOfDays} jours
            {/* Prévisions sur 4 jours */}
          </Typography>
          <Typography sx={{ color: "#aab3bf" }}>
            {name[0].toUpperCase() + name.slice(1)}
          </Typography>
        </Stack>

        {weatherForecast.map((weatherCurrentDay) => {
          return (
            <Fragment key={weatherCurrentDay.date}>
              <WeatherFifteenDaysCard {...weatherCurrentDay} />
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
