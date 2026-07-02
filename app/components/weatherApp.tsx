"use client";

import { useState } from "react";
import Form from "@/app/components/form";
import ViewWeather from "@/app/components/viewWeather";
import IntroductionScreen from "@/app/components/introductionScreen";
import TextField from "@mui/material/TextField";

export default function WeatherApp() {
  const [cityUser, setCityUser] = useState("");

  return (
    <div>
      <div className="grid grid-rows-3 grid-cols-6">
        <div className="grid col-span-full grid-cols-3 justify-items-center mt-20">
          <h1 className="col-start-1 col-end-1 text-2xl/7 font-bold text-blacl sm:truncate sm:text-3xl sm:tracking-tight text-black-customized">
            Meteo Voyage
          </h1>
          <div className="col-start-3 col-end-3">
            <Form setCityUser={setCityUser} />
          </div>
        </div>
        <div className="grid col-span-full grid-cols-12">
          <div className="col-start-5 col-end-9">
            {(!!cityUser && <ViewWeather name={cityUser} />) || (
              <IntroductionScreen />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
