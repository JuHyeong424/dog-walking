"use client";

import { useOpenWeather } from "@/hooks/useOpenWeather";

export default function WeatherComponent() {
  const { data: weather, isLoading, isError } = useOpenWeather({
    lat: 37.5665,
    lon: 126.9780
  });
  console.log(weather);

  return (
    <div>

    </div>
  )
}
