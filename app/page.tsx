import Form from "./components/form";
import Image from "next/image";
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

  const backgroundImage = (
    <Image
      src="/weather-background.jpeg"
      className="-z-10"
      fill={true}
      alt="Background image of the sky"
    />
  );

  const icon = (
    <svg
      className="stroke-white"
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3V21M9.99995 4L12 6L14 4M9.99995 20L12 18L14 20M4.23218 7.5L19.8206 16.5M4.11133 9.50885L6.57017 8.85L5.91133 6.39115M18.141 17.6089L17.4821 15.15L19.941 14.4912M19.8205 7.5L4.232 16.5M18.1413 6.39115L17.4825 8.85L19.9413 9.50885M4.11166 14.4911L6.57051 15.15L5.91166 17.6088"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  //  src={`{${weather.weather[0].main} === "Clouds" ? "/mist.svg" : "/rain.svg"`}
  return <ViewWeather />;
  return (
    <div className="z-40">
      {backgroundImage}
      <div className="text-center mt-6">
        <h1 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Meteo voyage
        </h1>
      </div>
      <Form />
      <div className="grid h-48 place-content-center text-white">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5 md:justify-items-center md:gap-0">
          <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
            <p>{Math.round(weather.main.temp)} °C</p>
          </div>
          <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
            <p>Ressenti: {Math.round(weather.main.feels_like)} °C</p>
          </div>
          <div className="bg-amber-800 border border-amber-500 rounded-lg p-2 flex gap-1 fill-red-200">
            {icon}
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
            <p>{weather.main.humidity}% humidité</p>
          </div>
          <div className="bg-amber-800 border border-amber-500 rounded-lg p-2">
            <p>Vitesse du vent : {Math.round(weather.wind.speed)}</p>
          </div>
        </div>
      </div>

      {/* <form id="form">
        <label>Veuillez entre la ville</label>
        <input name="city" required />
        <button type="submit">Rechercher</button>
      </form> */}
    </div>
  );
}
