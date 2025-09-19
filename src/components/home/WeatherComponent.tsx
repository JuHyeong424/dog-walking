import useOpenWeather from "@/hooks/useOpenWeather";

export default function Weather() {
  const currentWeather = useOpenWeather();
  console.log(currentWeather);

  return (
    <div>

    </div>
  )
}
