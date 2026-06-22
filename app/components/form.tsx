"use client";

import { useState } from "react";
import ViewWeather from "./viewWeather";

type City = {
  city: string;
};

export default function Form() {
  const [city, setCity] = useState("");

  function handleSubmission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setCity(e.target.city.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <input name="city" required />
        <button type="submit">Rechercher</button>
      </form>
      <ViewWeather city={city} />
    </div>
  );
}
