import Image from "next/image";
import { IWeather } from "@/app/types/weather";

interface IProps {
  main: IWeather["main"];
  id: IWeather["id"];
  width: number;
  height: number;
}

export default function WeatherIcon({ main, id, width, height }: IProps) {
  if (main === "Clear") {
    return (
      <Image src="/sun.svg" width={width} height={height} alt="Sun icon" />
    );
  } else if (main === "Clouds") {
    return (
      <Image src="/cloud.svg" width={width} height={height} alt="Cloud icon" />
    );
  } else if (main === "Drizzle" || main === "Rain") {
    return (
      <Image src="/rain.svg" width={width} height={height} alt="Rain icon" />
    );
  } else if (main === "Snow") {
    return (
      <Image src="/snow.svg" width={width} height={height} alt="Snow icon" />
    );
  } else if (main === "Thunderstorm") {
    return (
      <Image
        src="/thunderstorm.svg"
        width={width}
        height={height} 
        alt="Thunderstorm icon"
      />
    );
  } else if (id >= 701 && id < +781) {
    return <Image src="/mist.svg" width={width} height={height} alt="Mist icon" />;
  } else return null;
}
