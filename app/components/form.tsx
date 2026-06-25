"use client";

import { useState } from "react";
import City from "@/app/types/city";
import ViewWeather from "./viewWeather";

export default function Form() {
  const [cityUser, setCityUser] = useState("");

  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setCityUser(e.target.city.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <div>
          <input type="text" name="city" placeholder="Paris" required />
        </div>
        <button type="submit">Rechercher</button>
      </form>
      {!!cityUser && <ViewWeather name={cityUser} />}
    </div>
  );
}
