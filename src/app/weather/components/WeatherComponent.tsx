"use client";

import { useOpenWeather } from "@/hooks/useOpenWeather";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import {getWeatherIcon} from "@/utils/weatherIcons";
import {useAirPollution} from "@/hooks/useAirPollution";

export default function WeatherComponent() {
  const currentLocation = useCurrentLocation();
  const { data: weather, isWeatherLoading, isWeatherError } = useOpenWeather({
    lat: currentLocation?.lat,
    lon: currentLocation?.lon
  });
  const { data: airPollution, isAirPollutionLoading, isAirPollutionError} = useAirPollution({
    lat: currentLocation?.lat,
    lon: currentLocation?.lon
  });
  console.log(weather);
  console.log(airPollution)

  if (!currentLocation) return <p>위치 정보를 가져오는 중...</p>;
  if (isWeatherLoading) return <p>날씨 불러오는 중...</p>;
  if (isWeatherError || !weather) return <p>날씨 정보를 가져오지 못했습니다.</p>;
  if (isAirPollutionLoading) return <p>미세먼지 정보 불러오는 중...</p>
  if (isAirPollutionError || !airPollution) return <p>미세먼지 정보를 가져오지 못했습니다.</p>

  const weatherIcon = getWeatherIcon(weather.weather[0].main);

  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-blue-50 rounded-lg p-4 font-bold">
      <h2>{weather.name}</h2>
      <p className="text-4xl">{weatherIcon}</p>
      <p>기온: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
      <p>체감 온도: {(weather.main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>습도: {weather.main.humidity}%</p>
      <p>풍속: {weather.wind.speed} m/s</p>
      <p>미세먼지: {airPollution.list[0].components.pm10}µg/m³</p>
      <p>초미세먼지: {airPollution.list[0].components.pm2_5}µg/m³</p>
    </div>
  )
}
