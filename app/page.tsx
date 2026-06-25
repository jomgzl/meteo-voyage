import Form from "./components/form";
import Image from "next/image";
import ViewWeather from "./components/viewWeather";

export default async function Home() {

  const backgroundImage = (
    <Image
      src="/weather-background.jpeg"
      className="-z-10"
      fill={true}
      alt="Background image of the sky"
    />
  );

  return (
    <div>
      {backgroundImage}
      <Form />
      {/* <ViewWeather /> */}
    </div>
  );
}
