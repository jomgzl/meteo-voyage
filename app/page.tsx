import Form from './components/form'
import ViewWeather from "./components/viewWeather";

export default async function Home() {
  const apiOpenWeather: string | undefined = process.env.API_OPENWEATHER;

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&lang=fr&appid=${apiOpenWeather}`,
  );

  if (!data.ok) {
    return "There was an error with the weather server";
  }

  const weather = await data.json();

  return (
    <div>
      <h1>
        Meteo voyage
      </h1>
      <Form />
      {/* <ViewWeather /> */}
      {/* <div>
        <p>{weather.main.temp} °C</p>
        <p>Ressenti {weather.main.feels_like} °C</p>
        <p>{weather.weather[0].description}</p>
        <p>{weather.main.humidity}% humidité</p>
        <p>Vitesse du vent : {weather.wind.speed}</p>
      </div>

      <form id="form">
        <label>Veuillez entre la ville</label>
        <input name="city" required />
        <button type="submit">Rechercher</button>
      </form> */}
    </div>
  );
}
