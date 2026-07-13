import type { NextApiRequest, NextApiResponse } from "next";

const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

async function getCurrentWeather(city: string) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiOpenWeather}`,
  );
  console.log("Data 1: ", data);
  return data.json();
}

async function getSixteenDaysWeather(city: string) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiOpenWeather}`,
  );
  console.log("Data 2: ", data);
  return data.json();
}

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const city = req.body.name;

    const weatherCurrent = getCurrentWeather(city);
    const weatherSixteenDays = getSixteenDaysWeather(city);

    console.log("Weather current: ", weatherCurrent);

    const [weather, weatherSixteen] = await Promise.all([
      weatherCurrent,
      weatherSixteenDays,
    ]);

    console.log("Current weather:", weather);
    console.log("Weather to 16 days:", weatherSixteen);

    // if (!data.ok) {
    //   return res
    //     .status(data.status)
    //     .json({ message: "There was an error with the weather server" });
    // }

    res.status(200).json({ weather: weather, weatherSixteen: weatherSixteen });
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}
