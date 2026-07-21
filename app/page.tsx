import WeatherApp from "@/app/components/weather/weatherApp/weatherApp";
import { Suspense } from "react";

export default async function Home() {
  const backgroundcolor = {
    background:
      "linear-gradient(180deg, #eaf2fb 0%, #f6fafd 46%, #ffffff 100%)",
  };

  return (
    <div style={backgroundcolor}>
      <Suspense>
        <WeatherApp />
      </Suspense>
    </div>
  );
}
