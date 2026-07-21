import type { NextApiRequest, NextApiResponse } from "next";

const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;
const forecastNumberOfDays: number = 10;

async function getCurrentWeather(city: string, res: NextApiResponse) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiOpenWeather}`,
  );

  if (!data.ok) {
    return res
      .status(data.status)
      .json({ message: "There was an error with the weather server" });
  }
  return data.json();
}

async function getSixteenDaysWeather(city: string, res: NextApiResponse) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&cnt=${forecastNumberOfDays}&appid=${apiOpenWeather}`,
  );
  if (!data.ok) {
    return res
      .status(data.status)
      .json({ message: "There was an error with the weather server" });
  }
  return data.json();
}

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const city = req.body.name;

    const weatherCurrentAPI = getCurrentWeather(city, res);
    const weatherSixteenDaysAPI = getSixteenDaysWeather(city, res);

    const [weather, weatherSixteen] = await Promise.all([
      weatherCurrentAPI,
      weatherSixteenDaysAPI,
    ]);

    const [weatherCurrent, ...weatherFifteenDays] = weatherSixteen.list;

    res.status(200).json({
      weather: weatherCurrent,
      weatherFifteenDays: weatherFifteenDays,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}
