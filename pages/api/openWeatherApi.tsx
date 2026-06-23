import type { NextApiRequest, NextApiResponse } from "next";

type OpenWeatherData = {
  temperature: number;
  feelsLike: string;
  conditions: string;
  humidity: number;
  wind: number;
};

{
  /* <OpenWeatherData> */
}

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

  console.log("I am in the API");

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&lang=fr&appid=${apiOpenWeather}`,
  );

  const weather = await data.json();

  console.log("Still in the API", weather);

  if (!data.ok) {
    return res
      .status(500)
      .json({ message: "There was an error with the weather server" });
  }

  res.status(200).json({ weather: weather });
}
