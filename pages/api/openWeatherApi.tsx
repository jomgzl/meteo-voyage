import type { NextApiRequest, NextApiResponse } from "next";
import getWeatherForecast from "@/app/tools/openWeatherApi/getWeatherForecast";

const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;
const forecastNumberOfDays: number = 40;

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const city = req.body.name;

    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&cnt=${forecastNumberOfDays}&appid=${apiOpenWeather}`,
    );
    if (!data.ok) {
      console.log("STATUT", data.status);
      if (data.status === 404) {
        return res.status(data.status).json({ message: "City not found" });
      }
      throw new Error("There was an error with the weather server");
    }
    const weatherSixteen = await data.json();

    if (!weatherSixteen) {
      throw new Error("No data found");
    }

    const weatherFinal = getWeatherForecast(weatherSixteen.list);

    res.status(200).json({
      weather: weatherFinal,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}
