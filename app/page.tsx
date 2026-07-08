import WeatherApp from "@/app/components/weatherApp";

export default async function Home() {
  const backgroundcolor = {
    background:
      "linear-gradient(180deg, #eaf2fb 0%, #f6fafd 46%, #ffffff 100%)",
  };

  return (
    <div style={backgroundcolor}>
      <WeatherApp />
    </div>
  );
}
