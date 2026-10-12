import type { NextApiRequest, NextApiResponse } from "next";
import envVariableStringToNumber from "@/app/tools/envVariable/envVariableStringToNumber";
import getWeatherForecast from "@/app/tools/openWeatherApi/getWeatherForecast";

const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

const forecastNumberOfInstances: number | undefined = parseInt(
  process.env.NEXT_PUBLIC_ENV_FORECAST_TOTAL_NUMBER_OF_INSTANCES!,
);

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const city = req.body.name;

    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&cnt=${forecastNumberOfInstances}&appid=${apiOpenWeather}`,
    );
    if (!data.ok) {
      if (data.status === 404) {
        return res.status(data.status).json({ message: "City not found" });
      }
      throw new Error("There was an error with the weather server");
    }
    const weatherSixteen = await data.json();

    if (!weatherSixteen) {
      throw new Error("No data found");
    }

    console.log("WEATHER", weatherSixteen)

    const weatherFinal = getWeatherForecast(weatherSixteen.list);

    res.status(200).json({
      weather: weatherFinal,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}
