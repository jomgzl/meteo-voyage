"use client";

import Form from "@/app/components/form/form";
import IntroductionScreen from "@/app/components/introduction/introduction";
import styles from "./weatherApp.module.scss";
import WeatherFetch from "@/app/components/weather/weatherFetch/weatherFetch";
import useParamCity from "@/app/hooks/useCity";

export default function WeatherApp() {
  const city = useParamCity();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col mt-5 sm:flex-row sm:items-center sm:mt-10">
        <div className="ml-5 sm:ml-auto sm:mr-auto">
          <h1 className={`${styles.bullet} text-[22px] text-[#15202b]`}>
            Meteo Voyage
          </h1>
        </div>
        <div className="ml-5 mr-5 mt-5 sm:ml-auto sm:mr-auto sm:mt-0">
          <Form />
        </div>
      </div>
      <div
        className="flex h-screen w-screen mt-14 pl-5 pr-5 box-border"
      >
        <div className="flex justify-center w-full mt-auto mb-auto">
          {(!!city && <WeatherFetch name={city} />) || <IntroductionScreen />}
        </div>
      </div>
    </div>
  );
}
