# Meteo Voyage
This is a weather forecast app. It allows the user to get the weather of any city and save it as a favourite.

## Tech stack
* Next.js
* TypeScript
* Tailwind
* Material UI
* API : OpenWeather API

## Features
* **Weather forecast:** 5 days weather forecast for any city
* **Favourite:** Save and remove weather forecasts for any city (upcoming)
* **Geolocation:** Display weather forecast according to the user's location (upcoming)

## Getting started
git clone https://github.com/jomgzl/meteo-voyage.git <br>
cd meteo-voyage <br>
npm install

Create a .env file in the project root: <br>
OPENWEATHER_API_KEY=your_api_key_here <br>
Get a free key at openweathermap.org/api. <br>
NEXT_PUBLIC_ENV_FORECAST_TOTAL_NUMBER_OF_INSTANCES=40 <br>
NEXT_PUBLIC_ENV_FORECAST_NUMBER_OF_DAILY_INSTANCES=8

Then run the dev server: <br>
npm run dev <br>
The app runs at http://localhost:3000.

## Deployment
Deployed on Vercel. Add OPENWEATHER_API_KEY, NEXT_PUBLIC_ENV_FORECAST_TOTAL_NUMBER_OF_INSTANCES and NEXT_PUBLIC_ENV_FORECAST_NUMBER_OF_DAILY_INSTANCES under Project Settings -> Environment Variables before deploying - the build will succeed without it, but requests will fail at runtime.
