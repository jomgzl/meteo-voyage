"use client";

import { lazy, Suspense } from "react";
import Form from "@/app/components/form";
import IntroductionScreen from "@/app/components/introductionScreen";
import styles from "./weatherApp.module.scss";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/loading";

export default function WeatherApp() {
  const searchParams = useSearchParams();
  const cityUser = searchParams?.get("city");
  const ViewWeather = lazy(() => import("@/app/components/viewWeather"));

  return (
    <div className="flex flex-col justify-center content-around h-screen">
      <div className="flex flex-col mt-5 sm:flex-row sm:items-center sm:mt-10">
        <div className="ml-5 sm:ml-auto sm:mr-auto">
          <h1 className={`${styles.bullet} text-[22px] text-[#15202b]`}>
            Meteo Voyage
          </h1>
        </div>
        <div className="ml-5 mr-5 mt-5 sm:ml-auto sm:mr-auto sm:w-auto sm:mt-0">
          <Form/>
        </div>
      </div>
      <div className="flex h-screen w-screen pl-5 pr-5 box-border">
        <div className="flex justify-center mt-10 w-full sm:mt-0 sm:self-center">
          <Suspense fallback={<Loading />}>
            {(!!cityUser && <ViewWeather name={cityUser} />) || (
              <IntroductionScreen />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
