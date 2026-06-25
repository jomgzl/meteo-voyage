import type { NextApiRequest, NextApiResponse } from "next";

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

  console.log("I am in the API, this is what I received from the client:", req.body);

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&lang=fr&appid=${apiOpenWeather}`,
  );

  const weather = await data.json();

  if (!data.ok) {
    return res
      .status(500)
      .json({ message: "There was an error with the weather server" });
  }

  res.status(200).json({ weather: weather });
}
