import type { NextApiRequest, NextApiResponse } from "next";

const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;
const forecastNumberOfDays: number = 15;

async function getSixteenDaysWeather(city: string, res: NextApiResponse) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&cnt=${forecastNumberOfDays}&appid=${apiOpenWeather}`,
  );
  if (!data.ok) {
    console.log("STATUT", data.status);
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
    const weatherSixteenDaysAPI = getSixteenDaysWeather(city, res);

    const weatherSixteen = await weatherSixteenDaysAPI;

    if(!weatherSixteen) {
      throw new Error("City name was not found");
    }

    console.log("WW", weatherSixteen);

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
