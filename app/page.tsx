import Image from "next/image";
import Form from 'next/form'

export default async function Home() {
  const apiOpenWeather=process.env.API_OPENWEATHER;

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=52.2297&lon=21.0122&units=metric&lang=en&appid=${apiOpenWeather}`,
  );
  const weather = await data.json();
  return (
    <div>
      <h5>
        <b>This is a test</b>
      </h5>
      <p>{weather.main.temp} °C</p>

      <form action="/search">
        <label>Veuillez entre la ville</label>
        <input name="city"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
