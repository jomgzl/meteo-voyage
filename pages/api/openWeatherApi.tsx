import type { NextApiRequest, NextApiResponse } from "next";

export default async function getOpenWeatherData(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

    const city = req.body.name;

    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiOpenWeather}`,
    );

    const weather = await data.json();

    if (!data.ok) {
      return res
        .status(data.status)
        .json({ message: "There was an error with the weather server" });
    }

    console.log(weather);

    res.status(200).json({ weather: weather });
  } catch (e) {
    console.error(e);
    res.status(500).send({});
  }
}
