import Form from "./components/form";

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
      <div className="text-center mt-6">
        <h1 className="text-2xl/7 font-bold text-sky-600 sm:truncate sm:text-3xl sm:tracking-tight">
          Meteo voyage
        </h1>
      </div>
      <Form />
      {/* <ViewWeather /> */}
      <div>
        <p>{Math.round(weather.main.temp)} °C</p>
        <p>Ressenti {Math.round(weather.main.feels_like)} °C</p>
        <p>{weather.weather[0].description}</p>
        <p>{weather.main.humidity}% humidité</p>
        <p>Vitesse du vent : {Math.round(weather.wind.speed)}</p>
      </div>

      <form id="form">
        <label>Veuillez entre la ville</label>
        <input name="city" required />
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
}
