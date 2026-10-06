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
* **Geolocation:** Display weather forecast according to the user's location

## Getting started
git clone https://github.com/jomgzl/meteo-voyage.git
cd meteo-voyage
npm install

Create a .env file in the project root:

OPENWEATHER_API_KEY=your_api_key_here
Get a free key at openweathermap.org/api.

Then run the dev server:

npm run dev
The app runs at http://localhost:3000.

## Deployment
Deployed on Vercel. Add OPENWEATHER_API_KEY under Project Settings -> Environment Variables before deploying - the build will succeed without it, but requests will fail at runtime.
