import Image from "next/image";
import { IWeatherCondition } from "@/app/types/weather";

interface IProps {
  main: IWeatherCondition["main"];
  id: IWeatherCondition["id"];
}

export default function WeatherIcon({ main, id }: IProps) {
  if (main === "Clear") {
    return (
      <Image src="/sun.svg" width={60} height={60} alt="Sun icon"/>
    );
  } else if (main === "Clouds") {
    return (
      <Image src="/cloud.svg" width={60} height={60} alt="Cloud icon"/>
    );
  } else if (main === "Drizzle" || main === "Rain") {
    return (
      <Image src="/rain.svg" width={60} height={60} alt="Rain icon"/>
    );
  } else if (main === "Snow") {
    return (
     <Image src="/snow.svg" width={60} height={60} alt="Snow icon"/>
    );
  } else if (main === "Thunderstorm") {
    return (
     <Image src="/thunderstorm.svg" width={60} height={60} alt="Thunderstorm icon"/>
    );
  } else if (id >= 701 && id < +781) {
    return (
     <Image src="/mist.svg" width={60} height={60} alt="Mist icon"/>
    );
  } else return null;
}
